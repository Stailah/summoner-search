import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="footer-component">
      <hr />
      <div className="footer">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/champions">Champions</Link>
          <Link to="/leaderboard">Leaderboard</Link>
        </nav>
      </div>
    </div>
  );
};
