import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Register.css";

function Register({ onClose }) {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "", // Only used for Sign Up
  });

  const navigate = useNavigate(); // Initialize navigate

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isSigningUp ? "/api/signup" : "/api/signin"; // Adjust API endpoint
    const queryParams = new URLSearchParams({
      username: formData.username,
      password: formData.password,
    });

    const url = `${endpoint}?${queryParams.toString()}`; // Append query parameters to the URL

    try {
      const response = await fetch(url, {
        method: "GET", // Change method to GET
      });

      const data = await response.json();

      if (response.status === 200) { // Success response for GET request
        console.log("Success:", data);

        if (!isSigningUp) {
          alert("Logged in successfully!");
          onClose(); // Close the modal
          navigate("/profile"); // Redirect to the Profile page after successful login
        } else {
          alert("Sign Up successful! Please log in.");
          setIsSigningUp(false); // Switch to Sign In mode
        }
      } else if (response.status === 400 || response.status === 401) {
        // Handle client-side errors (e.g., invalid credentials, bad data)
        alert(data.message || "Invalid credentials or missing fields. Please try again.");
      } else {
        // Handle other failure cases (e.g., server errors)
        alert(data.message || "An error occurred. Please try again later.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Unable to connect to the server. Please try again later.");
    }
  };

  return (
    <div className="register-modal">
      <div className="register-content">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <h2>{isSigningUp ? "Sign Up" : "Sign In"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          {isSigningUp && (
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          )}
          <button type="submit">{isSigningUp ? "Sign Up" : "Sign In"}</button>
        </form>
        <button onClick={() => setIsSigningUp(!isSigningUp)}>
          {isSigningUp
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  );
}

export default Register;
