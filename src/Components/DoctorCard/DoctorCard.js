import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './DoctorCard.css';
import AppointmentForm from '../AppointmentForm/AppointmentForm';
import { v4 as uuidv4 } from 'uuid';

const DoctorCard = ({ name, speciality, experience, ratings }) => {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);

  // Load appointments from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(name);
    if (stored) {
      setAppointments([JSON.parse(stored)]);
    }
  }, [name]);

  const handleBooking = () => {
    setShowModal(true);
  };

  const handleCancel = (appointmentId) => {
    setAppointments([]);
    localStorage.removeItem(name);
    localStorage.removeItem('doctorData');
    window.dispatchEvent(new Event('force-notification-update'));
  };

  const handleFormSubmit = (appointmentData) => {
    const newAppointment = {
      id: Date.now(), // or uuidv4()
      ...appointmentData,
    };
    setAppointments([newAppointment]);
    localStorage.setItem(name, JSON.stringify(newAppointment));
    localStorage.setItem('doctorData', JSON.stringify({ name, speciality, experience, ratings }));
    window.dispatchEvent(new Event('force-notification-update'));
    setShowModal(false);
  };

  return (
    <div className="doctor-card-container">
      <div className="doctor-card-details-container">
        <div className="doctor-card-profile-image-container">
          <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          </svg>
        </div>
        <div className="doctor-card-details">
          <div className="doctor-card-detail-name">{name}</div>
          <div className="doctor-card-detail-speciality">{speciality}</div>
          <div className="doctor-card-detail-experience">{experience} years experience</div>
          <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
        </div>
      </div>

      <div className="doctor-card-options-container">
        {/* Only show button when modal is not open */}
        {!showModal && (
          <button
            className={`book-appointment-btn ${appointments.length > 0 ? 'cancel-appointment' : ''}`}
            onClick={handleBooking}
          >
            {appointments.length > 0 ? (
              <div>Cancel Appointment</div>
            ) : (
              <div>Book Appointment</div>
            )}
            <div>No Booking Fee</div>
          </button>
        )}

        <Popup
          modal
          open={showModal}
          onClose={() => setShowModal(false)}
        >
          {(close) => (
            <div className="doctorbg" style={{ height: '100vh', overflow: 'scroll' }}>
              <div className="doctor-card-profile-image-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </svg>
              </div>
              <div className="doctor-card-details">
                <div className="doctor-card-detail-name">{name}</div>
                <div className="doctor-card-detail-speciality">{speciality}</div>
                <div className="doctor-card-detail-experience">{experience} years experience</div>
                <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
              </div>

              {appointments.length > 0 ? (
                <>
                  <h3 style={{ textAlign: 'center' }}>Appointment Booked!</h3>
                  {appointments.map((appointment) => (
                    <div className="bookedInfo" key={appointment.id}>
                      <p>Name: {appointment.name}</p>
                      <p>Phone Number: {appointment.phoneNumber}</p>
                      <button onClick={() => handleCancel(appointment.id)}>Cancel Appointment</button>
                    </div>
                  ))}
                </>
              ) : (
                <AppointmentForm
                  doctorName={name}
                  doctorSpeciality={speciality}
                  onSubmit={handleFormSubmit}
                />
              )}
            </div>
          )}
        </Popup>
      </div>
    </div>
  );
};

export default DoctorCard;
