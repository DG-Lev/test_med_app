// Following code has been commented with appropriate comments for your reference.
import React, { useEffect, useState } from 'react';
import './Notification.css';

// Function component Notification to display user notifications
const Notification = () => {
  // State variables to manage doctor data and appointment data
  const [appointmentData, setAppointmentData] = useState(null);
  const [doctorData, setDoctorData] = useState(null);

  // useEffect hook to perform side effects in the component
  useEffect(() => {
    // Retrieve stored doctor data from localStorage
    const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
    setDoctorData(storedDoctorData);
    // If doctor data exists, retrieve and set corresponding appointment data from localStorage
    if (storedDoctorData) {
      const storedAppointmentData = JSON.parse(localStorage.getItem(storedDoctorData.name));
      setAppointmentData(storedAppointmentData);
    }
  }, []); // Empty dependency array ensures useEffect runs only once after initial render

  // Listen for changes to localStorage (for multi-tab support and booking updates)
  useEffect(() => {
    const handleStorage = () => {
      // Retrieve and update doctor data from localStorage
      const updatedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
      setDoctorData(updatedDoctorData);
      // If doctor data is available, update appointment data; otherwise, set appointment data to null
      if (updatedDoctorData) {
        const updatedAppointment = JSON.parse(localStorage.getItem(updatedDoctorData.name));
        setAppointmentData(updatedAppointment);
      } else {
        setAppointmentData(null);
      }
    };
    window.addEventListener('storage', handleStorage);
    // Also listen for custom event in the same tab
    window.addEventListener('force-notification-update', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('force-notification-update', handleStorage);
    };
  }, []);

  // Function to handle appointment cancellation
  const handleCancel = () => {
    // If doctor data is available, remove corresponding appointment data and doctor data from localStorage, update state, and notify other tabs/components
    if (doctorData) {
      localStorage.removeItem(doctorData.name);
      localStorage.removeItem('doctorData');
      setAppointmentData(null);
      setDoctorData(null);
      // Notify other tabs/components
      window.dispatchEvent(new Event('force-notification-update'));
    }
  };

  // If no appointment data is available, render nothing
  if (!appointmentData) return null;

  // Return JSX elements to display appointment notification and cancel button
  return (
    <div className="notification-banner">
      <div>
        <strong>Appointment booked</strong>
        <div>For: <b>{appointmentData.name || "User"}</b></div>
        <div>With: <b> {doctorData?.name}</b></div>
        <div>On: <b>{appointmentData.appointmentDate || "N/A"}</b></div>
        <div>At: <b>{appointmentData.selectedSlot || "N/A"}</b></div>
      </div>
      {/* Button to cancel the appointment */}
      <button onClick={handleCancel} title="Cancel Appointment">&times;</button>
    </div>
  );
};
// Export Notification component for use in other parts of the application
export default Notification;