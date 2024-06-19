const fs = require('fs');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Utility function to load data from JSON files
function loadData(file) {
  return JSON.parse(fs.readFileSync(`data/${file}`, 'utf8'));
}

// Load job seekers and job postings from JSON files
let jobSeekers = loadData('jobSeekers.json');
let jobPostings = loadData('jobPostings.json');

// Enhanced matching algorithm with detailed scores
function matchCandidates() {
  const MAX_SCORE = 50;
  const SKILL_MAX_POINTS = 15;
  const EXPERIENCE_MAX_POINTS = 20;
  const LOCATION_MAX_POINTS = 5;
  const SOFT_SKILLS_MAX_POINTS = 10;

  let matches = [];

  jobSeekers.forEach(seeker => {
    jobPostings.forEach(posting => {
      let matchScore = 0;
      let details = {
        skills: 0,
        experience: 0,
        location: 0,
        softSkills: 0,
        missingSkills: [],
        experienceGap: 0,
        locationMismatch: false,
        missingSoftSkills: []
      };

      // Skills matching
      let requiredSkills = posting.requiredSkills.length;
      let matchingSkills = seeker.skills.filter(skill => posting.requiredSkills.includes(skill)).length;
      if (requiredSkills > 0) {
        details.skills = (matchingSkills / requiredSkills) * SKILL_MAX_POINTS;
        details.missingSkills = posting.requiredSkills.filter(skill => !seeker.skills.includes(skill));
      }
      matchScore += details.skills;

      // Experience matching
      if (seeker.experience >= posting.requiredExperience) {
        details.experience = EXPERIENCE_MAX_POINTS;
      } else {
        // Proportional scoring for experience below required
        details.experience = (seeker.experience / posting.requiredExperience) * EXPERIENCE_MAX_POINTS;
        details.experienceGap = Math.ceil(posting.requiredExperience - seeker.experience); // Calculate the actual years missing, rounded up
      }
      matchScore += details.experience;

      // Location matching
      if (seeker.location === posting.location) {
        details.location = LOCATION_MAX_POINTS;
      } else {
        details.locationMismatch = true;
      }
      matchScore += details.location;

      // Soft skills matching
      let requiredSoftSkills = posting.softSkillsRequired.length;
      let matchingSoftSkills = seeker.softSkills.filter(skill => posting.softSkillsRequired.includes(skill)).length;
      if (requiredSoftSkills > 0) {
        details.softSkills = (matchingSoftSkills / requiredSoftSkills) * SOFT_SKILLS_MAX_POINTS;
        details.missingSoftSkills = posting.softSkillsRequired.filter(skill => !seeker.softSkills.includes(skill));
      }
      matchScore += details.softSkills;

      // Check if the match score exceeds the threshold
      if (matchScore > (MAX_SCORE * 0.5)) { // Only consider significant matches
        matches.push({
          jobSeekerId: seeker.id,
          jobSeekerName: seeker.name,
          jobPostingId: posting.id,
          jobPostingCompany: posting.company,
          role: posting.role, // Include the role in the match details
          score: matchScore.toFixed(2), // Round to 2 decimal places
          details
        });
      }
    });
  });
  return matches;
}

// API Routes

// Fetch all job seekers
app.get('/job-seekers', (req, res) => {
  res.json(jobSeekers);
});

// Fetch all job postings
app.get('/job-postings', (req, res) => {
  res.json(jobPostings);
});

// Fetch all matches
app.get('/matches', (req, res) => {
  res.json(matchCandidates());
});

// Fetch details of a specific job seeker
app.get('/job-seekers/:id', (req, res) => {
  const jobSeeker = jobSeekers.find(seeker => seeker.id === parseInt(req.params.id));
  if (jobSeeker) {
    res.json(jobSeeker);
  } else {
    res.status(404).send('Job Seeker not found');
  }
});

// Fetch matched job postings for a specific job seeker
app.get('/job-seekers/:id/matches', (req, res) => {
  const jobSeeker = jobSeekers.find(seeker => seeker.id === parseInt(req.params.id));
  if (jobSeeker) {
    const matches = matchCandidates().filter(match => match.jobSeekerId === jobSeeker.id);
    res.json(matches);
  } else {
    res.status(404).send('Job Seeker not found');
  }
});

// Fetch details of a specific job posting
app.get('/job-postings/:id', (req, res) => {
  const jobId = parseInt(req.params.id); // Correctly parse the ID from the URL
  console.log(`Fetching job posting with ID: ${jobId}`);
  
  // Find the job posting with the matching ID
  const jobPosting = jobPostings.find(post => post.id === jobId);
  
  if (jobPosting) {
    console.log('Job Posting Found:', jobPosting);
    res.json(jobPosting);
  } else {
    console.log('Job Posting not found');
    res.status(404).send('Job Posting not found');
  }
});

// Fetch detailed match information for a specific job seeker
app.get('/matches/:id/details', (req, res) => {
  const jobSeeker = jobSeekers.find(seeker => seeker.id === parseInt(req.params.id));
  if (jobSeeker) {
    const matches = matchCandidates().filter(match => match.jobSeekerId === jobSeeker.id);
    if (matches.length > 0) {
      const detailedMatches = matches.map(match => {
        const jobPosting = jobPostings.find(post => post.id === match.jobPostingId);
        return {
          ...match,
          jobPostingDetails: jobPosting ? {
            company: jobPosting.company,
            role: jobPosting.role, // Include the role in the detailed match view
            requiredSkills: jobPosting.requiredSkills,
            requiredExperience: jobPosting.requiredExperience,
            location: jobPosting.location,
            softSkillsRequired: jobPosting.softSkillsRequired
          } : null
        };
      });
      res.json(detailedMatches);
    } else {
      res.status(404).send('No matches found for this job seeker');
    }
  } else {
    res.status(404).send('Job Seeker not found');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
