import "./GameList.css";

function GameList({
  games,
  setSelectedGame,
  selectedGame,
  newReview,
  setNewReview,
  handleAddReview,
}) {
  return (
    <div className="game-list">
      {games.map((game) => (
        <div key={game.id} className="game-card">
          <h2>{game.title}</h2>
          <p>⭐ Rating: {game.rating} / 5</p>
          <h3>Reviews:</h3>
          <ul>
            {game.reviews.map((review, index) => (
              <li key={index}>{review}</li>
            ))}
          </ul>
          <button
            className="btn"
            onClick={() => setSelectedGame(game.id)}
          >
            Add a Review
          </button>
        </div>
      ))}
      {selectedGame && (
        <div className="add-review">
          <h3>Add Your Review</h3>
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Write your review here..."
          />
          <button className="btn-submit" onClick={handleAddReview}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

export default GameList;
