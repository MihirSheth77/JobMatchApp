// src/components/JobPostings.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Button, Box, Container, Paper, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';

function JobPostings() {
  const [jobPostings, setJobPostings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the list of job postings
    axios.get('http://localhost:3001/job-postings')
      .then(response => {
        setJobPostings(response.data);
        setLoading(false); // Data is fetched, stop loading
      })
      .catch(error => {
        console.error('Error fetching job postings:', error);
        setError('Failed to fetch job postings');
        setLoading(false); // Stop loading if there's an error
      });
  }, []);

  if (loading) return <Box sx={{ mt: 4, textAlign: 'center' }}><CircularProgress /></Box>;

  if (error) return <Box sx={{ mt: 4, textAlign: 'center', color: 'red' }}>{error}</Box>;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        Job Postings
      </Typography>
      <Grid container spacing={4}>
        {jobPostings.map(post => (
          <Grid item key={post.id} xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{
              borderRadius: 2,
              overflow: 'hidden',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
              }
            }}>
              <CardContent>
                <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
                  {post.company}
                </Typography>
                <Typography color="textSecondary" sx={{ mb: 1 }}>
                  <strong>Role:</strong> {post.role}
                </Typography>
                <Typography color="textSecondary" sx={{ mb: 1 }}>
                  <strong>Required Skills:</strong> {post.requiredSkills.join(', ')}
                </Typography>
                <Typography color="textSecondary" sx={{ mb: 1 }}>
                  <strong>Experience Required:</strong> {post.requiredExperience} years
                </Typography>
                <Typography color="textSecondary" sx={{ mb: 1 }}>
                  <strong>Location:</strong> {post.location}
                </Typography>
                <Typography color="textSecondary" sx={{ mb: 2 }}>
                  <strong>Soft Skills Required:</strong> {post.softSkillsRequired.join(', ')}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={`/job-postings/${post.id}`}
                  sx={{ borderRadius: 2, padding: '8px 16px' }}
                >
                  View Company Profile
                </Button>
              </CardContent>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default JobPostings;
