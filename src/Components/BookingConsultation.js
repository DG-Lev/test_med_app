import React, { useEffect, useState } from 'react';
import './BookingConsultation.css';
import FindDoctorSearch from './FindDoctorSearch/FindDoctorSearch';
import DoctorCard from './DoctorCard/DoctorCard';
import { useSearchParams } from 'react-router-dom';

const BookingConsultation = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [searchParams] = useSearchParams();

  const getDoctorsDetails = () => {
    fetch('https://api.npoint.io/9a5543d36f1460da2f63')
      .then(res => res.json())
      .then(data => {
        setDoctors(data);

        const speciality = searchParams.get('speciality');
        if (speciality) {
          const filtered = data.filter(
            doctor =>
              doctor.speciality.toLowerCase() === speciality.toLowerCase()
          );
          setFilteredDoctors(filtered);
          setIsSearched(true);
        }
      })
      .catch(err => console.log(err));
  };

  const handleSearch = (searchText) => {
    if (searchText === '') {
      setFilteredDoctors([]);
      setIsSearched(false);
    } else {
      const filtered = doctors.filter(
        doctor =>
          doctor.speciality.toLowerCase().includes(searchText.toLowerCase()) ||
          doctor.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredDoctors(filtered);
      setIsSearched(true);
    }
  };

  useEffect(() => {
    getDoctorsDetails();
  }, [searchParams]);

  return (
    <div className="booking-consultation-container">
      <FindDoctorSearch onSearch={handleSearch} />
      <div className="search-results-container">
        {isSearched && (
          <>
            <h2>{filteredDoctors.length} doctors are available</h2>
            <h3>Book appointments with minimum wait-time & verified doctor details</h3>
            <div className="doctor-cards-grid">
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                  <DoctorCard {...doctor} key={doctor.name} />
                ))
              ) : (
                <p>No doctors found.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingConsultation;
