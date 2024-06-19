// src/components/CompanyProfile.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, Typography, Box, Button, Container, Paper } from '@mui/material';

function CompanyProfile() {
  const { id } = useParams();  // Get the company ID from the URL
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the details of the company (job posting)
    axios.get(`http://localhost:3001/job-postings/${id}`)
      .then(response => {
        console.log('Company Data:', response.data);
        setCompany(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching company details:', error);
        setError('Failed to fetch company details');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Box sx={{ mt: 4, textAlign: 'center' }}><div>Loading...</div></Box>;

  if (error) return <Box sx={{ mt: 4, textAlign: 'center', color: 'red' }}>{error}</Box>;

  if (!company) return <Box sx={{ mt: 4, textAlign: 'center' }}><div>No company data available.</div></Box>;

  return (
    <Container sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
            {company.company}
          </Typography>
          {/* Company Description */}
          <Typography variant="body1" color="textSecondary" sx={{ mt: 2, mb: 4 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla scelerisque sem eget tortor dapibus, id malesuada odio vehicula. 
            Praesent non felis in nisl consequat vulputate. Vivamus non volutpat mauris. Phasellus vitae velit ligula. Curabitur non dui et 
            velit sodales tristique ut ac tortor. Maecenas lacinia tincidunt diam, et aliquam orci tincidunt non. Ut sed est nec lorem 
            consequat fermentum nec nec dui.
          </Typography>
        </Box>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            <strong>Job Details:</strong>
          </Typography>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            <strong>Required Skills:</strong> {company.requiredSkills.join(', ')}
          </Typography>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            <strong>Required Experience:</strong> {company.requiredExperience} years
          </Typography>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            <strong>Location:</strong> {company.location}
          </Typography>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            <strong>Soft Skills Required:</strong> {company.softSkillsRequired.join(', ')}
          </Typography>
        </Box>
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
      </Paper>
    </Container>
  );
}

export default CompanyProfile;
