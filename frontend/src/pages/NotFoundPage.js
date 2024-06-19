// src/pages/NotFoundPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

function NotFoundPage() {
  return (
    <Box sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h2" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="h5" gutterBottom>
        The page you're looking for does not exist.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/" sx={{ mt: 4 }}>
        Go to Home
      </Button>
    </Box>
  );
}

export default NotFoundPage;
