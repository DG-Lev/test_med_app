// Import necessary modules from React library
import React, { useEffect } from 'react';

// Import components for routing from react-router-dom library
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import custom Navbar component
import Navbar from './Components/Navbar/Navbar';

import LandingPage from './Components/Landing_Page/Landing_Page';

import SignUp from './Components/Sign_Up/SignUp';

import Login from './Components/Login/Login';

import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultation';

import FindDoctorSearch from './Components/FindDoctorSearch/FindDoctorSearch';

// import DoctorCard from '/Components/DoctorCard/DoctorCard';
// Function component for the main App
function App() {

  // Render the main App component
  return (
    <div className="App">
        {/* Set up BrowserRouter for routing */}
        <BrowserRouter>
          {/* Display the Navbar component */}
          <Navbar/>

          {/* Set up the Routes for different pages */}
          <Routes>
            {/* Define individual Route components for different pages */}
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/instant-consultation" element={<InstantConsultation/>} />
            <Route path="/appointments" element={<FindDoctorSearch/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

// Export the App component as the default export
export default App;