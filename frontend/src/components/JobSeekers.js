// src/components/JobSeekers.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Button, Box, Container } from '@mui/material';
import { Link } from 'react-router-dom';

function JobSeekers() {
  const [jobSeekers, setJobSeekers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the list of job seekers
    axios.get('http://localhost:3001/job-seekers')
      .then(response => {
        setJobSeekers(response.data);
        setLoading(false);  // Data is fetched, stop loading
      })
      .catch(error => {
        console.error('Error fetching job seekers:', error);
        setError('Failed to fetch job seekers');
        setLoading(false);  // Stop loading if there's an error
      });
  }, []);

  if (loading) return <Box sx={{ mt: 4, textAlign: 'center' }}><div>Loading...</div></Box>;

  if (error) return <Box sx={{ mt: 4, textAlign: 'center', color: 'red' }}>{error}</Box>;

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Job Seekers
        </Typography>
      </Box>
      <Grid container spacing={3} justifyContent="center">
        {jobSeekers.map(seeker => (
          <Grid item key={seeker.id} xs={12} sm={6} md={4}>
            <Card sx={{ 
              boxShadow: 3, 
              borderRadius: 2, 
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
              },
              padding: 2
            }}>
              <CardContent sx={{ textAlign: 'left' }}>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                  {seeker.name}
                </Typography>
                <Typography color="textSecondary" sx={{ mb: 1.5 }}>
                  <strong>Skills:</strong> {seeker.skills.join(', ')}
                </Typography>
                <Typography color="textSecondary" sx={{ mb: 1.5 }}>
                  <strong>Experience:</strong> {seeker.experience} years
                </Typography>
                <Typography color="textSecondary" sx={{ mb: 1.5 }}>
                  <strong>Location:</strong> {seeker.location}
                </Typography>
                <Typography color="textSecondary" sx={{ mb: 1.5 }}>
                  <strong>Soft Skills:</strong> {seeker.softSkills.join(', ')}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={`/matches/${seeker.id}`}
                  sx={{
                    mt: 2,
                    borderRadius: 2,
                    padding: '8px 16px',
                    backgroundColor: '#1976d2',
                    '&:hover': {
                      backgroundColor: '#1565c0',
                    }
                  }}
                >
                  View Relevant Jobs
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default JobSeekers;
