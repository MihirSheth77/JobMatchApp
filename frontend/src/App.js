import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import JobSeekers from './components/JobSeekers';
import JobPostings from './components/JobPostings';
import CompanyProfile from './components/CompanyProfile';
import MatchDetailView from './components/MatchDetailView';
import UserMatchDetails from './components/UserMatchDetails';  // This might be the matches list view

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/job-seekers" element={<JobSeekers />} />
        <Route path="/job-postings" element={<JobPostings />} />
        <Route path="/job-postings/:id" element={<CompanyProfile />} />
        <Route path="/matches/:id" element={<MatchDetailView />} />
        <Route path="/matches" element={<UserMatchDetails />} />  {/* Ensure this route is defined */}
      </Routes>
    </Router>
  );
}

export default App;
