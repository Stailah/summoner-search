import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../credentials";
import Match from "./Match";

const Summoner = () => {
  const navigate = useNavigate();

  const [summonerData, setSummonerData] = useState({
    region: "euw1",
    summonerName: "",
    summonerLevel: null,
    puuid: null,
    summonerIcon: null,
    summonerID: null,
    name: null,
    iconIMG: null,
    leagueStats: [],
  });

  const handleRegionChange = (event) => {
    setSummonerData({
      ...summonerData,
      region: event.target.value,
    });
  };

  const handleSearch = async () => {
    const { region, summonerName } = summonerData;
    const response = await fetch(
      `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${API}`
    );
    const data = await response.json();

    setSummonerData({
      ...summonerData,
      summonerLevel: data.summonerLevel,
      puuid: data.puuid,
      summonerIcon: data.profileIconId,
      summonerID: data.id,
      name: data.name,
      iconIMG: `http://ddragon.leagueoflegends.com/cdn/13.11.1/img/profileicon/${data.profileIconId}.png`,
    });

    navigate(`/search/${region}/${summonerName}`);
  };

  const handleSummonerNameChange = (event) => {
    setSummonerData({
      ...summonerData,
      summonerName: event.target.value,
    });
  };

  useEffect(() => {
    const fetchLeagueStats = async () => {
      if (summonerData.summonerID) {
        const response = await fetch(
          `https://${summonerData.region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerData.summonerID}?api_key=${API}`
        );
        const leagueData = await response.json();

        setSummonerData((prevState) => ({
          ...prevState,
          leagueStats: leagueData,
        }));
      }
    };

    fetchLeagueStats();
  }, [summonerData.summonerID, summonerData.region, setSummonerData]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const {
    region,
    summonerName,
    summonerLevel,
    name,
    iconIMG,
    leagueStats,
    puuid,
  } = summonerData;

  return (
    <div>
      <div className="searcher-div">
        <div className="searcher">
          <select value={region} onChange={handleRegionChange}>
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
          <input
            type="text"
            placeholder="Summoner Name"
            value={summonerName}
            onChange={handleSummonerNameChange}
            onKeyDown={handleKeyDown}
            style={{ padding: "10px" }}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>

      {summonerLevel !== null && (
        <div>
          <div>
            <div className="resultsContainer">
              <div className="playerProfile">
                <img src={iconIMG} alt="" />
                <div>
                  <h2>{name}</h2>
                  <p>{summonerLevel}</p>
                </div>
              </div>
              <div className="playerStats">
                {leagueStats.length > 0 ? (
                  leagueStats.map((league) => (
                    <div className="leagues" key={league.queueType}>
                      <h4>
                        {league.queueType === "RANKED_FLEX_SR"
                          ? "Flex Queue"
                          : "Solo Queue"}
                      </h4>
                      <p>
                        {league.tier} {league.rank} {league.leaguePoints} LP
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="unranked">
                    <h3>Solo Queue</h3>
                    <p>Unranked</p>
                    <h3>Flex Queue</h3>
                    <p>Unranked</p>
                  </div>
                )}
              </div>

              <div className="matchHistory">
                <p></p>
                <Match
                  puuid={puuid}
                  region={region}
                  summonerName={summonerName}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { Summoner };
