import React, { useEffect, useState } from "react";
import "./ReviewForm.css";

// Helper to get all consultations for the current user
function getUserConsultations(userEmail) {
  const consultations = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key === "doctorData") continue;
    try {
      const appointment = JSON.parse(localStorage.getItem(key));
      // Only include if appointment is for this user (by email) and completed
      if (
        appointment &&
        appointment.userEmail === userEmail &&
        appointment.status === "completed"
      ) {
        consultations.push({
          serialNumber: appointment.serialNumber || "", // <-- add this
          doctorName: appointment.doctorName || key,
          doctorSpeciality: appointment.doctorSpeciality || appointment.speciality || "",
          review: appointment.review || "",
          rating: appointment.rating || "",
          appointmentDate: appointment.appointmentDate || "",
          selectedSlot: appointment.selectedSlot || "",
          phoneNumber: appointment.phoneNumber || "",
          patientName: appointment.name || "",
        });
      }
    } catch (e) {
      // skip non-JSON or unrelated keys
    }
  }
  // Sort by appointmentDate ascending (oldest first)
  consultations.sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate));
  return consultations;
}

// Update status to "completed" if appointment date is in the past
function updateAppointmentStatuses(userEmail) {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key === "doctorData") continue;
    try {
      const appointment = JSON.parse(localStorage.getItem(key));
      if (
        appointment &&
        appointment.userEmail === userEmail &&
        appointment.appointmentDate
      ) {
        const today = new Date();
        const apptDate = new Date(appointment.appointmentDate);
        if (apptDate < today && appointment.status !== "completed") {
          appointment.status = "completed";
          localStorage.setItem(key, JSON.stringify(appointment));
        }
      }
    } catch (e) {}
  }
}

const ReviewForm = () => {
  const [consultations, setConsultations] = useState([]);
  const [reviewingIndex, setReviewingIndex] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [starRating, setStarRating] = useState(0);
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" for oldest first, "desc" for newest first
  const userEmail = sessionStorage.getItem("email");

  useEffect(() => {
    if (userEmail) {
      updateAppointmentStatuses(userEmail);
      setConsultations(getUserConsultations(userEmail));
    }
  }, [userEmail]);

  // Open review modal/row, prefill if editing
  const handleReviewClick = (idx) => {
    setReviewingIndex(idx);
    setReviewText(consultations[idx].review || "");
    setStarRating(Number(consultations[idx].rating) || 0);
  };

  // Save review and rating to localStorage and update state
  const handleReviewSubmit = (idx) => {
    const doctorName = consultations[idx].doctorName;
    const appointment = JSON.parse(localStorage.getItem(doctorName));
    appointment.review = reviewText;
    appointment.rating = starRating;
    localStorage.setItem(doctorName, JSON.stringify(appointment));
    setConsultations(getUserConsultations(userEmail));
    setReviewingIndex(null);
    setReviewText("");
    setStarRating(0);
  };

  // Sort consultations based on the selected order
  const sortedConsultations = [...consultations].sort((a, b) => {
    const dateA = new Date(a.appointmentDate);
    const dateB = new Date(b.appointmentDate);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  return (
    <div className="review-form-container">
      <h2>Your Consultations</h2>
      <div style={{ marginBottom: "10px" }}>
        <label htmlFor="sortOrder">Sort by date:</label>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={e => setSortOrder(e.target.value)}
          style={{ marginLeft: "8px", padding: "4px" }}
        >
          <option value="asc">Oldest first</option>
          <option value="desc">Newest first</option>
        </select>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>Provide Feedback</th>
            <th>Review Given</th>
            <th>Star Rating</th>
          </tr>
        </thead>
        <tbody>
          {consultations.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ textAlign: "center" }}>No consultations found.</td>
            </tr>
          ) : (
            sortedConsultations.map((c, idx) => (
              <tr key={c.doctorName}>
                <td style={{ textAlign: "center" }}>{c.serialNumber}</td>
                <td style={{ textAlign: "center" }}>{c.doctorName}</td>
                <td style={{ textAlign: "center" }}>{c.doctorSpeciality}</td>
                <td style={{ textAlign: "center" }}>
                  {reviewingIndex === idx ? (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <textarea
                        value={reviewText}
                        onChange={e => setReviewText(e.target.value)}
                        rows={2}
                        style={{ width: "160px", marginBottom: "6px" }}
                        placeholder="Write your feedback..."
                      />
                      <div style={{ marginBottom: "6px" }}>
                        {[1,2,3,4,5].map(num => (
                          <span
                            key={num}
                            style={{
                              cursor: "pointer",
                              color: num <= starRating ? "#FFD700" : "#ccc",
                              fontSize: "1.5rem",
                              marginRight: 2
                            }}
                            onClick={() => setStarRating(num)}
                            role="button"
                            aria-label={`Rate ${num} star${num > 1 ? "s" : ""}`}
                          >★</span>
                        ))}
                      </div>
                      <button
                        className="submit-button"
                        style={{ width: "100px", padding: "6px 0", fontSize: "0.95rem" }}
                        onClick={() => handleReviewSubmit(idx)}
                        disabled={!reviewText.trim() || starRating === 0}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <button
                      className="submit-button"
                      style={{ width: "100px", padding: "6px 0", fontSize: "0.95rem" }}
                      onClick={() => handleReviewClick(idx)}
                    >
                      {c.review ? "Edit" : "Click Here"}
                    </button>
                  )}
                </td>
                <td style={{ textAlign: "center" }}>{c.review ? "Yes" : ""}</td>
                <td style={{ textAlign: "center" }}>
                  {c.rating ? (
                    <span style={{ color: "#FFD700", fontSize: "1.2rem" }}>
                      {"★".repeat(Number(c.rating))}
                      <span style={{ color: "#ccc" }}>
                        {"★".repeat(5 - Number(c.rating))}
                      </span>
                    </span>
                  ) : ""}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewForm;