import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './Components/Navbar/Navbar';
import LandingPage from './Components/Landing_Page/Landing_Page';
import SignUp from './Components/Sign_Up/SignUp';
import Login from './Components/Login/Login';
import BookingConsultation from './Components/BookingConsultation';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/appointments" element={<BookingConsultation />} />
          <Route path="/instant-consultation" element={<BookingConsultation />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
