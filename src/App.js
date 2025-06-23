import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './Components/Navbar/Navbar';
import LandingPage from './Components/Landing_Page/Landing_Page';
import SignUp from './Components/Sign_Up/SignUp';
import Login from './Components/Login/Login';
import BookingConsultation from './Components/BookingConsultation';
import Notification from './Components/Notification/Notification'; 
import ReviewForm from './Components/ReviewForm/ReviewForm';
import ProfileCard from './Components/ProfileCard/ProfileCard';
import ReportsLayout from './Components/ReportsLayout/ReportsLayout';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Notification /> 
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/instant-consultation" element={<BookingConsultation />} />
          <Route path="/reviews" element={<ReviewForm />} />
          <Route path="/profile" element={<ProfileCard />} />
          <Route path="/reports" element={<ReportsLayout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
