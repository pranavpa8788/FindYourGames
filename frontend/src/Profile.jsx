import React, { useState } from "react";
import "./Profile.css";

function Profile() {
  const [recommendedGames, setRecommendedGames] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleRecommendGames = async () => {
    setLoading(true);
    try {
      // Sending a GET request to the backend for recommended games
      const response = await fetch("/api/recommend-games", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // You can add auth token here if needed:
          // Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        // If the response is successful, set the recommended games
        setRecommendedGames(data.recommendedGames);
      } else {
        alert(data.message || "Failed to fetch recommended games.");
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      alert("Failed to fetch recommendations. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile">
      <h1>Welcome to Your Profile</h1>
      <p>Here you can see game recommendations based on your preferences.</p>
      <button className="recommend-btn" onClick={handleRecommendGames}>
        {loading ? "Loading..." : "Recommend Games"}
      </button>

      {recommendedGames.length > 0 && (
        <div className="game-list">
          <h2>Recommended Games</h2>
          <ul>
            {recommendedGames.map((game) => (
              <li key={game.id} className="game-item">
                <h3>{game.title}</h3>
                <p>Genre: {game.genre}</p>
                <p>Rating: {game.rating} / 5</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Profile;
