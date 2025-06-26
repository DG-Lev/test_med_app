export const API_URL = window.location.hostname === "localhost"
  ? "http://localhost:8181"
  : "https://medicalapp-uc3j.onrender.com";

console.log("API_URL:", API_URL);
