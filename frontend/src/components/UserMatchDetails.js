// src/components/UserMatchDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Box, Button, Container, Paper } from '@mui/material';

function UserMatchDetails() {
  const { id } = useParams();  // Get the job seeker ID from the URL
  const [jobSeeker, setJobSeeker] = useState(null);
  const [matches, setMatches] = useState([]);
  const [jobPostings, setJobPostings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the details of the job seeker
    axios.get(`/job-seekers/${id}`)
      .then(response => {
        setJobSeeker(response.data);
      })
      .catch(error => {
        setError('Failed to fetch job seeker details');
      });

    // Fetch matched job postings for this job seeker
    axios.get(`/job-seekers/${id}/matches`)
      .then(response => {
        setMatches(response.data);

        // Fetch detailed information for each matched job posting
        const jobPostingIds = response.data.map(match => match.jobPostingId);
        const jobPostingRequests = jobPostingIds.map(jobId =>
          axios.get(`/job-postings/${jobId}`)
            .then(response => {
              setJobPostings(prevState => ({
                ...prevState,
                [jobId]: response.data
              }));
            })
            .catch(error => console.error(`Error fetching job posting ${jobId}:`, error))
        );

        // Wait for all job posting requests to complete
        Promise.all(jobPostingRequests)
          .then(() => {
            setLoading(false);
          })
          .catch(error => {
            setLoading(false);
          });
      })
      .catch(error => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Box sx={{ mt: 4, textAlign: 'center' }}><div>Loading...</div></Box>;

  if (error) return <Box sx={{ mt: 4, textAlign: 'center', color: 'red' }}>{error}</Box>;

  if (!jobSeeker) return <Box sx={{ mt: 4, textAlign: 'center' }}><div>No job seeker data available.</div></Box>;

  return (
    <Container sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
            Matches for {jobSeeker.name}
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
        Relevant Job Matches
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {matches.length > 0 ? matches.map((match, index) => {
          const jobPosting = jobPostings[match.jobPostingId];
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
                    Job at {jobPosting ? jobPosting.company : 'Loading...'}
                  </Typography>
                  {jobPosting && (
                    <Box sx={{ mt: 2 }}>
                      <Typography color="textSecondary">
                        <strong>Required Skills:</strong> {jobPosting.requiredSkills.join(', ')}
                      </Typography>
                      <Typography color="textSecondary">
                        <strong>Required Experience:</strong> {jobPosting.requiredExperience} years
                      </Typography>
                      <Typography color="textSecondary">
                        <strong>Location:</strong> {jobPosting.location}
                      </Typography>
                      <Typography color="textSecondary">
                        <strong>Soft Skills Required:</strong> {jobPosting.softSkillsRequired.join(', ')}
                      </Typography>
                    </Box>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2, borderRadius: 2, padding: '8px 16px' }}
                    component={Link}
                    to={`/job-postings/${jobPosting ? jobPosting.id : '#'}`}
                  >
                    View Company Profile
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        }) : (
          <Typography variant="subtitle1" color="textSecondary" sx={{ mt: 2 }}>
            No relevant job matches found.
          </Typography>
        )}
      </Grid>
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ borderRadius: 2, padding: '10px 20px' }}
          component={Link}
          to="/job-seekers"
        >
          Back to Job Seekers List
        </Button>
      </Box>
    </Container>
  );
}

export default UserMatchDetails;
