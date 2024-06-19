// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import JobSeekers from './components/JobSeekers';
import JobPostings from './components/JobPostings';
import CompanyProfile from './components/CompanyProfile';
import MatchDetailView from './components/MatchDetailView';
import UserMatchDetails from './components/UserMatchDetails';
import HomePage from './pages/HomePage'; 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/job-seekers" element={<JobSeekers />} />
        <Route path="/job-postings" element={<JobPostings />} />
        <Route path="/job-postings/:id" element={<CompanyProfile />} />
        <Route path="/matches/:id" element={<MatchDetailView />} />
        <Route path="/user-matches/:id" element={<UserMatchDetails />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
