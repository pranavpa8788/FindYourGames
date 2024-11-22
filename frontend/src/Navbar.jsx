import React, { useState } from "react";
import "./Navbar.css";

function Navbar({ onRegisterClick }) {
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query
  const [searchResults, setSearchResults] = useState(null); // State to store the search results
  const [error, setError] = useState(null); // State to handle errors

  const handleSearch = async () => {
    if (!searchQuery.trim()) return; // Don't make a request if the search query is empty

    try {
      // Send the request to the backend with the entered game name
      const response = await fetch(`/api/search?game=${searchQuery}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data from server");
      }

      const data = await response.json();

      if (data.length === 0) {
        setSearchResults("No results found.");
      } else {
        setSearchResults(data);
      }
      setError(null); // Clear previous errors if the request is successful
    } catch (error) {
      console.error("Error fetching search results:", error);
      setError("An error occurred while searching. Please try again later.");
      setSearchResults(null); // Clear previous search results
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(); // Trigger search when Enter key is pressed
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-options">
        {/* Removed the More Games link */}
        <a
          href="https://github.com/pranavpa8788/FindYourGames"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link"
        >
          About Us
        </a>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query as user types
          onKeyPress={handleKeyPress} // Trigger search on Enter key press
        />
        <button className="search-btn" onClick={handleSearch}>
          <i className="fas fa-search"></i> {/* Search Icon */}
        </button>

        {/* Dropdown for search results */}
        {searchQuery && (
          <div className="search-dropdown">
            {error && <p className="error-message">{error}</p>}
            {searchResults && typeof searchResults === "string" ? (
              <p>{searchResults}</p> // No results found
            ) : (
              <div className="search-results-list">
                {searchResults && searchResults.map((game) => (
                  <div key={game.id} className="game-card">
                    <h2>{game.title}</h2>
                    <p>Rating: {game.rating} / 5</p>
                    <h3>Reviews:</h3>
                    <ul>
                      {game.reviews.map((review, index) => (
                        <li key={index}>{review}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="register">
        <button className="register-btn" onClick={onRegisterClick}>
          Register
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
