import { useState } from "react";
import "./App.css";
import "./Navbar.css";
import Navbar from "./Navbar";
import Register from "./Register"; // Import the Register component

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

  const [showRegister, setShowRegister] = useState(false); // Modal visibility state

  return (
    <div className="App">
      <Navbar onRegisterClick={() => setShowRegister(true)} /> {/* Pass handler */}
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
      <footer>
        <p>Game Review Hub © 2024</p>
      </footer>

      {/* Conditionally render Register modal */}
      {showRegister && <Register onClose={() => setShowRegister(false)} />}
    </div>
  );
}

export default App;
