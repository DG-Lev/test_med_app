import React, { useState } from 'react';

const AppointmentFormIC = ({ doctorName, doctorSpeciality, onSubmit }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const phoneRegex = /^[0-9]{10,15}$/;

    if (!name.trim()) newErrors.name = 'Name is required.';
    if (!phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required.';
    else if (!phoneRegex.test(phoneNumber)) newErrors.phoneNumber = 'Enter a valid phone number.';
    if (!appointmentDate) newErrors.appointmentDate = 'Please select a date.';
    if (!selectedSlot) newErrors.selectedSlot = 'Please select a time slot.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      name,
      phoneNumber,
      appointmentDate,
      selectedSlot,
    });

    setName('');
    setPhoneNumber('');
    setAppointmentDate('');
    setSelectedSlot('');
    setErrors({});
  };

  return (
    <form onSubmit={handleFormSubmit} className="appointment-form">
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <span className="error-text">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        {errors.phoneNumber && <span className="error-text">{errors.phoneNumber}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="appointmentDate">Date of Appointment:</label>
        <input
          type="date"
          id="appointmentDate"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
        />
        {errors.appointmentDate && <span className="error-text">{errors.appointmentDate}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="timeSlot">Book Time Slot:</label>
        <select
          id="timeSlot"
          value={selectedSlot}
          onChange={(e) => setSelectedSlot(e.target.value)}
        >
          <option value="">Select a time slot</option>
          <option value="10:00 AM">10:00 AM</option>
          <option value="11:30 AM">11:30 AM</option>
          <option value="1:00 PM">1:00 PM</option>
          <option value="3:00 PM">3:00 PM</option>
        </select>
        {errors.selectedSlot && <span className="error-text">{errors.selectedSlot}</span>}
      </div>

      <button type="submit">Book Now</button>
    </form>
  );
};

export default AppointmentFormIC;
