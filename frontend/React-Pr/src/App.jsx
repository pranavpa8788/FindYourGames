import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; // Import routing
import "./App.css";
import Navbar from "./Navbar";
import Register from "./Register";
import Profile from "./Profile"; // Import Profile page

function App() {
  const [games] = useState([
    {
      id: 1,
      title: "The Legend of Zelda",
      rating: 4.9,
      reviews: ["Amazing open world!", "A masterpiece."],
    },
    {
      id: 2,
      title: "Elden Ring",
      rating: 4.8,
      reviews: ["Fantastic combat!", "Incredible design."],
    },
  ]);

  const [showRegister, setShowRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user login state

  return (
    <Router>
      <div className="App">
        <Navbar onRegisterClick={() => setShowRegister(true)} />
        {showRegister && (
          <Register
            onClose={() => setShowRegister(false)}
            onLogin={() => setIsLoggedIn(true)} // Handle login success
          />
        )}

        <Routes>
          <Route
            path="/"
            element={
              <>
                <header>
                  <h1>Game Review Hub</h1>
                  <p>Explore reviews and share your thoughts on your favorite games!</p>
                </header>
                <main>
                  {games.map((game) => (
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
                </main>
              </>
            }
          />
          <Route
            path="/profile"
            element={
              isLoggedIn ? <Profile /> : <Navigate to="/" /> // Redirect if not logged in
            }
          />
        </Routes>
        <footer>
          <p>Game Review Hub © 2024</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
