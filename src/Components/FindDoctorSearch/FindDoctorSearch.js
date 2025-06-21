import React, { useState } from 'react';
import './FindDoctorSearch.css';
import { useNavigate } from 'react-router-dom';

const initSpeciality = [
    'Dentist', 'Gynecologist/obstetrician', 'General Physician', 'Dermatologist', 'Ear-nose-throat (ent) Specialist', 'Homeopath', 'Ayurveda'
];

const FindDoctorSearch = () => {
    const [doctorResultHidden, setDoctorResultHidden] = useState(true);
    const [searchDoctor, setSearchDoctor] = useState('');
    const [specialities, setSpecialities] = useState(initSpeciality);
    const navigate = useNavigate();

    const handleDoctorSelect = (speciality) => {
        setSearchDoctor(speciality);
        setDoctorResultHidden(true);
        navigate(`/instant-consultation?speciality=${speciality}`);
        window.location.reload();
    };

    return (
        <div className="finddoctor-wrapper">
            <h1>Find a doctor and Consult instantly</h1>

            <img
                className="doctor-main-image"
                src={process.env.PUBLIC_URL + '/images/DoctorSearch.png'}
                alt="Doctor Illustration"
            />

            <div className="doctor-search-box">
                <input
                    type="text"
                    className="search-doctor-input-box"
                    placeholder="Search doctors, clinics, hospitals, etc."
                    onFocus={() => setDoctorResultHidden(false)}
                    onBlur={() => setDoctorResultHidden(true)}
                    value={searchDoctor}
                    onChange={(e) => setSearchDoctor(e.target.value)}
                />
                <div className="findiconimg">
                    <img
                        className="findIcon"
                        src={process.env.PUBLIC_URL + '/images/search.svg'}
                        alt="Search Icon"
                    />
                </div>

                <div className={`search-doctor-input-results ${!doctorResultHidden ? 'show' : ''}`}>
                    {specialities.map((speciality) => (
                        <div
                            className="search-doctor-result-item"
                            key={speciality}
                            onMouseDown={() => handleDoctorSelect(speciality)}
                        >
                            <span>
                                <img src={process.env.PUBLIC_URL + '/images/search.svg'} alt="" className="result-icon" />
                            </span>
                            <span>{speciality}</span>
                            <span>SPECIALITY</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FindDoctorSearch;