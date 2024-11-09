// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './components/LandingPage';
import AuthSection from './components/auth/AuthSection';

import MentorsPage from './components/MentorsPages';
import BecomeMentor from './components/BecomeMentors';
import CompanyPage from './components/companies';
import CompanyDetailsPage from './components/CompanyDetailsPage';
import PostJob from './components/JobPosting';
import JobList from './components/jobList';
import EditProfile from './components/EditProfile';
import Profile from './components/Profile';
import Newjob from './components/host/newjob';
import Intership from './components/intership';
import RegisterCompany from './components/host/RegisterCompany';

function App() {
    return (
        <div>
           
         
            <Router>
              
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/companies" element={<CompanyPage />} />
                    <Route path="/register-company" element={<RegisterCompany />} />
                    <Route path="/jobPosting" element={<PostJob />} />
                    <Route path="/jobList" element={<JobList />} />
                    <Route path="/hoster" element={<Newjob/>} />
                    <Route path="/internships" element={<Intership/>} />
                    
                   
                    {/* <Route path="/company/:companyId" element={<CompanyDetailsPage/>} /> */}

                    <Route path="/about" element={<EditProfile />} />
                    <Route path="/myProfile" element={<EditProfile />} />
                    <Route path="/auth/login" element={<AuthSection />} />
                    <Route path="/auth/profile" element={<Profile />} />
                    <Route path="/become-mentor" element={<BecomeMentor />} />
                    <Route path="/mentors" element={<MentorsPage />} />
                </Routes>
            </Router>
           
        </div>
    );
}

export default App;
