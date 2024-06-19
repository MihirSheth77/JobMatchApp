// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

function HomePage() {
  return (
    <Box sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h2" gutterBottom>
        Welcome to the Job Matching App
      </Typography>
      <Typography variant="h5" gutterBottom>
        Find the best job matches based on your skills, experience, and preferences.
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button variant="contained" color="primary" component={Link} to="/job-seekers" sx={{ mx: 2 }}>
          View Job Seekers
        </Button>
        <Button variant="contained" color="secondary" component={Link} to="/job-postings" sx={{ mx: 2 }}>
          View Job Postings
        </Button>
      </Box>
    </Box>
  );
}

export default HomePage;
