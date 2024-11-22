import React, { useState } from "react";
import "./Register.css";

function Register({ onClose }) {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "", // Only used for Sign Up
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const endpoint = isSigningUp ? "/api/signup" : "/api/signin"; // Adjust API endpoint
    const payload = isSigningUp
      ? { username: formData.username, password: formData.password, email: formData.email }
      : { username: formData.username, password: formData.password };
  
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
      if (response.ok) {
        // Success: Handle accordingly
        console.log("Success:", data);
  
        if (!isSigningUp) {
          
          localStorage.setItem("authToken", data.token);
          alert("Logged in successfully!");
          onClose(); 
        } else {
          alert("Sign Up successful! Please log in.");
          setIsSigningUp(false); 
        }
      } else {
        
        alert(data.message || "An error occurred. Please try again.");
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
