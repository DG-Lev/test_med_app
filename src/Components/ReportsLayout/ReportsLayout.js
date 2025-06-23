import React, { useEffect, useState } from "react";
import "./ReportsLayout.css";

// Helper to get all reports for the current user
function getUserReports(userEmail) {
  const reports = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key === "doctorData") continue;
    try {
      const appointment = JSON.parse(localStorage.getItem(key));
      // Only include if appointment is for this user and has a report
      if (
        appointment &&
        appointment.userEmail === userEmail &&
        appointment.status === "completed" &&
        appointment.reportUrl // assuming reportUrl is saved with appointment
      ) {
        reports.push({
          serialNumber: appointment.serialNumber || "",
          doctorName: appointment.doctorName || key,
          doctorSpeciality: appointment.doctorSpeciality || appointment.speciality || "",
          reportUrl: appointment.reportUrl,
        });
      }
    } catch (e) {
      // skip non-JSON or unrelated keys
    }
  }
  // Sort by serialNumber ascending (oldest first)
  reports.sort((a, b) => Number(a.serialNumber) - Number(b.serialNumber));
  return reports;
}

const ReportsLayout = () => {
  const [reports, setReports] = useState([]);
  const userEmail = sessionStorage.getItem("email");

  useEffect(() => {
    if (userEmail) {
      setReports(getUserReports(userEmail));
    }
  }, [userEmail]);

  const handleDownload = (url) => {
    // Simple download logic (works for direct file links)
    const link = document.createElement("a");
    link.href = url;
    link.download = ""; // Let browser decide filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="review-form-container">
      <h2>Your Reports</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>View Report</th>
            <th>Download Report</th>
          </tr>
        </thead>
        <tbody>
          {reports.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ textAlign: "center" }}>No reports found.</td>
            </tr>
          ) : (
            reports.map((r, idx) => (
              <tr key={r.serialNumber || r.doctorName + idx}>
                <td style={{ textAlign: "center" }}>{r.serialNumber}</td>
                <td style={{ textAlign: "center" }}>{r.doctorName}</td>
                <td style={{ textAlign: "center" }}>{r.doctorSpeciality}</td>
                <td style={{ textAlign: "center" }}>
                  <a
                    href={r.reportUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="submit-button"
                    style={{ textDecoration: "none", padding: "6px 18px" }}
                  >
                    View
                  </a>
                </td>
                <td style={{ textAlign: "center" }}>
                  <button
                    className="submit-button"
                    style={{ padding: "6px 18px" }}
                    onClick={() => handleDownload(r.reportUrl)}
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsLayout;