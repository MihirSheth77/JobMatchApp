// src/components/JobSeekerDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Box, Button } from '@mui/material';

function JobSeekerDetails() {
  const { id } = useParams();
  const [jobSeeker, setJobSeeker] = useState(null);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    // Fetch the details of the job seeker
    axios.get(`/job-seekers/${id}`)
      .then(response => {
        console.log('Job Seeker Data:', response.data);
        setJobSeeker(response.data);
      })
      .catch(error => console.error('Error fetching job seeker details:', error));
    
    // Fetch matched job postings for this job seeker
    axios.get(`/job-seekers/${id}/matches`)
      .then(response => {
        console.log('Matched Job Postings:', response.data);
        setMatches(response.data);
      })
      .catch(error => console.error('Error fetching matched job postings:', error));
  }, [id]);

  if (!jobSeeker) return <div>Loading...</div>;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Relevant Jobs for {jobSeeker.name}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Skills: {jobSeeker.skills.join(', ')}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Experience: {jobSeeker.experience} years
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Location: {jobSeeker.location}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Soft Skills: {jobSeeker.softSkills.join(', ')}
      </Typography>
      <Grid container spacing={3} justifyContent="center" sx={{ mt: 4 }}>
        {matches.length > 0 ? matches.map((match, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2">
                  Job at {match.jobPosting}
                </Typography>
                <Typography color="textSecondary">
                  Score: {match.score}
                </Typography>
                <Typography color="textSecondary">
                  Skills: {match.details.skills.toFixed(1)}
                </Typography>
                <Typography color="textSecondary">
                  Experience: {match.details.experience.toFixed(1)}
                </Typography>
                <Typography color="textSecondary">
                  Location: {match.details.location.toFixed(1)}
                </Typography>
                <Typography color="textSecondary">
                  Soft Skills: {match.details.softSkills.toFixed(1)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )) : (
          <Typography variant="subtitle1" color="textSecondary">
            No relevant job matches found.
          </Typography>
        )}
      </Grid>
      <Button variant="contained" color="primary" sx={{ mt: 4 }} href="/job-seekers">
        Back to Job Seekers
      </Button>
    </Box>
  );
}

export default JobSeekerDetails;
