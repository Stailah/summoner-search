import React, { useState, useEffect } from "react";
import { API } from "../credentials";

export const Soloqleaderboard = () => {
  const [players, setPlayers] = useState([]);
  const [showCount, setShowCount] = useState(50);
  const [startIndex, setStartIndex] = useState(0);
  const [region, setRegion] = useState("euw1");
  const [summonerName, setSummonerName] = useState("");
  const [exportedSummonerName, setExportedSummonerName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(
        `https://${region}.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key=${API}`
      );
      const data = await response.json();
      const { entries } = data;
      if (entries && entries.length > 0) {
        const sortedPlayers = entries.sort(
          (a, b) => b.leaguePoints - a.leaguePoints
        );
        setPlayers(sortedPlayers.slice(startIndex, startIndex + showCount));
      }
      setIsLoading(false);
    };

    fetchData();
  }, [region, startIndex]);

  const handleNextPage = () => {
    setStartIndex(startIndex + showCount);
  };

  const handlePreviousPage = () => {
    setStartIndex(startIndex - showCount);
  };

  const handleRegionChange = (event) => {
    setRegion(event.target.value);
    setStartIndex(0);
  };

  const handleSearch = () => {
    console.log(summonerName);
    setExportedSummonerName(summonerName);
  };

  const handleSummonerNameChange = (event) => {
    setSummonerName(event.target.value);
  };

  return (
    <div className="leaderboard">
      <h1>Leaderboard</h1>

      <div className="region-selector">
        <select id="region" value={region} onChange={handleRegionChange}>
          <option value="euw1">EUW</option>
          <option value="na1">NA</option>
          <option value="eun1">EUNE</option>
          <option value="br1">BR</option>
          <option value="la1">LAN</option>
          <option value="la2">LAS</option>
          <option value="oc1">OCE</option>
          <option value="ru">RU</option>
          <option value="tr1">TR</option>
          <option value="jp1">JP</option>
          <option value="kr">KR</option>
        </select>
      </div>

      {isLoading ? (
        <div class="loader-5 center">
          <span></span>
        </div>
      ) : (
        <div className="flex-container">
          {players.map((player, index) => {
            const { summonerName, leaguePoints, wins, losses } = player;
            const winRatio = (wins / (wins + losses)) * 100;

            return (
              <div key={index}>
                <div className="summoner-name">
                  <span>{index + 1 + startIndex}.</span> {summonerName}
                </div>
                <div className="leaderboard-division">Challenger I</div>
                <div className="leaderboard-lp">{leaguePoints} LP</div>
                <div className="leaderboard-wr">{Math.trunc(winRatio)}%</div>
              </div>
            );
          })}
        </div>
      )}

      <div className="pagination">
        {startIndex > 0 && (
          <button className="pagination-btn" onClick={handlePreviousPage}>
            Previous Page
          </button>
        )}
        {players.length >= showCount && startIndex < 300 && (
          <button className="pagination-btn" onClick={handleNextPage}>
            Next Page
          </button>
        )}
      </div>
    </div>
  );
};

export default Soloqleaderboard;
