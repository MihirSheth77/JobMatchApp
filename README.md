# JobMatchApp

JobMatchApp is a web application designed to match job seekers with job postings based on their skills, experience, location, and soft skills. This app includes a frontend built with React and Material-UI and a backend powered by Node.js and Express.js. The application evaluates job seekers and job postings, providing detailed match scores and highlighting any missing qualifications or skills.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Job Seekers Management**: Manage a list of job seekers with their skills, experience, and soft skills.
- **Job Postings Management**: Manage job postings including required skills, experience, and location.
- **Matching Algorithm**: A detailed algorithm that scores the match between job seekers and job postings.
- **Missing Requirements Analysis**: Highlights missing skills, experience gaps, and location mismatches.
- **User Interface**: Clean and interactive UI built with React and Material-UI for viewing and managing job seekers and postings.

## Tech Stack

- **Frontend**:
  - React.js
  - Material-UI
  - Axios (for API calls)
  - React Router (for navigation)

- **Backend**:
  - Node.js
  - Express.js
  - JSON for data storage (can be replaced with a database)
  - Cors and Body-Parser for handling API requests

## Setup Instructions

### Prerequisites

Ensure you have the following installed:
- Node.js and npm
- Git

### Backend Setup

1. **Navigate to the Backend Directory**:

   ```bash
   cd /path/to/your/project-root/backend
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Run the Backend Server**:

   ```bash
   npm start
   ```

   The server will run on `http://localhost:3001` by default.

### Frontend Setup

1. **Navigate to the Frontend Directory**:

   ```bash
   cd /path/to/your/project-root/frontend
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Run the Frontend Development Server**:

   ```bash
   npm start
   ```

   The frontend will run on `http://localhost:3000` by default.

### Connecting Frontend to Backend

Ensure that the frontend is correctly pointing to the backend API. Update the API base URL in your frontend configuration if necessary.

## Usage

1. **Access the Frontend**:

   Open your browser and navigate to `http://localhost:3000`.

2. **Explore the Application**:

   - View job seekers and their details.
   - View job postings and their details.
   - Check the match details for job seekers against job postings.

3. **Manage Data**:

   Use the backend API or edit the JSON files in the `backend/data` folder to add or modify job seekers and job postings.

## API Endpoints

The backend server provides the following API endpoints:

- **Job Seekers**:
  - `GET /job-seekers`: Fetch all job seekers.
  - `GET /job-seekers/:id`: Fetch details of a specific job seeker.
  - `GET /job-seekers/:id/matches`: Fetch matched job postings for a specific job seeker.

- **Job Postings**:
  - `GET /job-postings`: Fetch all job postings.
  - `GET /job-postings/:id`: Fetch details of a specific job posting.

- **Matches**:
  - `GET /matches`: Fetch all matches.
  - `GET /matches/:id/details`: Fetch detailed match information for a specific job seeker.

