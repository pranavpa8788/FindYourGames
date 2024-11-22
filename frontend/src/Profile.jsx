import React, { useState } from "react";
import "./Profile.css";

function Profile() {
  const [gameInput, setGameInput] = useState("");
  const [userGames, setUserGames] = useState([]); // To store games entered by the user
  const [recommendedGames, setRecommendedGames] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAddGame = () => {
    if (gameInput.trim() !== "") {
      setUserGames([...userGames, gameInput]);
      setGameInput("");
    }
  };

  const handleRecommendGames = async () => {
    if (userGames.length === 0) {
      alert("Please enter at least one game before requesting recommendations.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/recommend-games", {
        method: "POST", // Use POST to send data
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ games: userGames }), // Send entered games to the backend
      });

      if (response.ok) {
        const games = await response.json();
        setRecommendedGames(games); // Set recommended games from the response
      } else {
        alert("Failed to fetch recommended games. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching games:", error);
      alert("Unable to connect to the server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <h1>Welcome to Your Profile</h1>
      <div className="game-input-section">
        <input
          type="text"
          placeholder="Enter a game you have played"
          value={gameInput}
          onChange={(e) => setGameInput(e.target.value)}
          className="game-input"
        />
        <button onClick={handleAddGame} className="add-game-btn">
          Add Game
        </button>
      </div>
      <div className="user-games">
        {userGames.length > 0 && (
          <>
            <h2>Your Entered Games:</h2>
            <ul>
              {userGames.map((game, index) => (
                <li key={index}>{game}</li>
              ))}
            </ul>
          </>
        )}
      </div>
      <button onClick={handleRecommendGames} className="recommend-btn" disabled={loading}>
        {loading ? "Loading..." : "Recommend Games"}
      </button>
      <div className="recommended-games-section">
        {recommendedGames.length > 0 ? (
          <div className="recommended-games">
            {recommendedGames.map((game, index) => (
              <div key={index} className="game-card">
                <h2>{game.title}</h2>
                <p>Rating: {game.rating}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No recommendations yet. Click on "Recommend Games" to get suggestions.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
