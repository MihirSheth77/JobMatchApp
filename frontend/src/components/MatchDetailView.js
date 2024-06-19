// src/components/MatchDetailView.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Box, Button, Container, CircularProgress, Paper } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';

function MatchDetailView() {
  const { id } = useParams();  // Get the job seeker ID from the URL
  const [jobSeeker, setJobSeeker] = useState(null);
  const [matchDetails, setMatchDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the details of the job seeker
    axios.get(`http://localhost:3001/job-seekers/${id}`)
      .then(response => {
        setJobSeeker(response.data);
      })
      .catch(error => {
        console.error('Error fetching job seeker details:', error);
        setError('Failed to fetch job seeker details');
      });

    // Fetch detailed match information for this job seeker
    axios.get(`http://localhost:3001/matches/${id}/details`)
      .then(response => {
        setMatchDetails(response.data);
        setLoading(false); // Data is fetched, stop loading
      })
      .catch(error => {
        console.error('Error fetching match details:', error);
        setError('Failed to fetch match details');
        setLoading(false); // Stop loading if there's an error
      });
  }, [id]);

  if (loading) return <Box sx={{ mt: 4, textAlign: 'center' }}><CircularProgress /></Box>;

  if (error) return <Box sx={{ mt: 4, textAlign: 'center', color: 'red' }}>{error}</Box>;

  if (!jobSeeker) return <Box sx={{ mt: 4, textAlign: 'center' }}><div>No job seeker data available.</div></Box>;

  return (
    <Container sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
            Detailed Matches for {jobSeeker.name}
          </Typography>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            Skills: {jobSeeker.skills.join(', ')}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            Experience: {jobSeeker.experience} years
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            Location: {jobSeeker.location}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            Soft Skills: {jobSeeker.softSkills.join(', ')}
          </Typography>
        </Box>
      </Paper>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3, textAlign: 'center' }}>
        Match Details
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {matchDetails.map((match, index) => {
          const missingSkills = match.jobPostingDetails?.requiredSkills.filter(skill => !jobSeeker.skills.includes(skill)) || [];
          const missingSoftSkills = match.jobPostingDetails?.softSkillsRequired.filter(skill => !jobSeeker.softSkills.includes(skill)) || [];
          const allSkillsMissing = missingSkills.length === match.jobPostingDetails?.requiredSkills.length;
          const singleSkillMissing = missingSkills.length === 1;

          return (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card sx={{
                boxShadow: 3,
                borderRadius: 2,
                overflow: 'hidden',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                }
              }}>
                <CardContent>
                  <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Job at {match.jobPostingDetails?.company}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                    Role: {match.jobPostingDetails?.role}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                    Required Skills: {match.jobPostingDetails?.requiredSkills.join(', ')}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                    Required Experience: {match.jobPostingDetails?.requiredExperience} years
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                    Location: {match.jobPostingDetails?.location}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                    Soft Skills Required: {match.jobPostingDetails?.softSkillsRequired.join(', ')}
                  </Typography>

                  {/* Score Details */}
                  <Box sx={{ mt: 2, p: 2, backgroundColor: '#f9f9f9', borderRadius: 1 }}>
                    <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold' }}>
                      Score Details:
                    </Typography>
                    <Typography color="textSecondary">
                      Skills Match: {match.details.skills.toFixed(1)}/15
                    </Typography>
                    <Typography color="textSecondary">
                      Experience Match: {match.details.experience.toFixed(1)}/20
                    </Typography>
                    <Typography color="textSecondary">
                      Location Match: {match.details.location.toFixed(1)}/5
                    </Typography>
                    <Typography color="textSecondary">
                      Soft Skills Match: {match.details.softSkills.toFixed(1)}/10
                    </Typography>
                    <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold', mt: 2 }}>
                      Total Match Score: {match.score}/50
                    </Typography>
                  </Box>

                  {/* What's Missing Section */}
                  <Box sx={{ mt: 2, p: 2, backgroundColor: '#f0f0f0', borderRadius: 1 }}>
                    <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                      What's Missing:
                    </Typography>
                    <Box sx={{ pl: 2 }}>
                      {allSkillsMissing ? (
                        <Typography color="error" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CloseIcon color="error" /> Missing All Required Skills - <span style={{ color: '#d32f2f' }}>Not an ideal match due to missing skills.</span>
                        </Typography>
                      ) : singleSkillMissing ? (
                        <Typography color="error" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CloseIcon color="error" /> Missing Skill: {missingSkills[0]} - <span style={{ color: '#d32f2f' }}></span>
                        </Typography>
                      ) : missingSkills.length > 0 ? (
                        <Typography color="error" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CloseIcon color="error" /> Missing Skills: {missingSkills.join(', ')} - <span style={{ color: '#d32f2f' }}>Not an ideal match due to missing skills.</span>
                        </Typography>
                      ) : (
                        <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CheckCircleIcon color="success" /> All required skills are matched.
                        </Typography>
                      )}
                      {match.details.experience < 20 ? (
                        <Typography color="textSecondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CloseIcon color="error" /> Experience Gap: Needs {Math.ceil(match.details.experienceGap)} more year{Math.ceil(match.details.experienceGap) > 1 ? 's' : ''} to be ideal.
                        </Typography>
                      ) : (
                        <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CheckCircleIcon color="success" /> Experience meets the requirement.
                        </Typography>
                      )}
                      {match.details.location < 5 ? (
                        <Typography color="textSecondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CloseIcon color="error" /> Location Mismatch: Job is in {match.jobPostingDetails?.location}.
                        </Typography>
                      ) : (
                        <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CheckCircleIcon color="success" /> Location matches the job requirement.
                        </Typography>
                      )}
                      {missingSoftSkills.length > 0 ? (
                        <Typography color="textSecondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CloseIcon color="error" /> Missing Soft Skills: {missingSoftSkills.join(', ')}
                        </Typography>
                      ) : (
                        <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CheckCircleIcon color="success" /> All required soft skills are matched.
                        </Typography>
                      )}
                    </Box>
                  </Box>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2, borderRadius: 2, padding: '8px 16px' }}
                    component={Link}
                    to={`/job-postings/${match.jobPostingId}`}
                  >
                    View Company Profile
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ borderRadius: 2, padding: '10px 20px' }}
          component={Link}
          to="/matches"
        >
          Back to Matches List
        </Button>
      </Box>
    </Container>
  );
}

export default MatchDetailView;
