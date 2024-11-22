import "./TopGames.css";

function TopGames({ topGames }) {
  return (
    <section className="top-games">
      <h2>Top Games</h2>
      <div className="top-games-list">
        {topGames.map((game) => (
          <div key={game.id} className="top-game-card">
            <h3>{game.title}</h3>
            <p>⭐ {game.rating.toFixed(1)} / 5</p>
          </div>
        ))}      </div>
    </section>
  );
}

export default TopGames;
