import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <main>
      <header>
        <Link to="/" className="logo">
          SummonerStats
        </Link>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/champions">Champions</Link>
          <Link to="/leaderboard">Leaderboard</Link>
        </nav>
      </header>
    </main>
  );
};
