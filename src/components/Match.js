import React, { useState, useEffect } from "react";
import { API } from "../credentials";

const Match = ({ puuid, region, summonerName }) => {
  const [matchesData, setMatchesData] = useState([]);
  const [matchesInfo, setMatchesInfo] = useState([]);

  useEffect(() => {
    const fetchMatchData = async () => {
      if (puuid) {
        let regionUrl = "";

        switch (region) {
          case "euw1":
          case "eun1":
          case "tr1":
          case "ru":
            regionUrl = "europe";
            break;
          case "na1":
          case "br1":
          case "la1":
          case "la2":
            regionUrl = "americas";
            break;
          case "oc1":
          case "jp1":
          case "kr":
            regionUrl = "asia";
            break;

          default:
            regionUrl = "europe";
            break;
        }

        const response = await fetch(
          `https://${regionUrl}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${API}`
        );
        const matches = await response.json();
        setMatchesData(matches);
      }
    };

    fetchMatchData();
  }, [puuid, region]);

  useEffect(() => {
    const fetchMatchesInfo = async () => {
      if (matchesData.length > 0) {
        let regionUrl = "";

        switch (region) {
          case "euw1":
          case "eun1":
          case "tr1":
          case "ru":
            regionUrl = "europe";
            break;
          case "na1":
          case "br1":
          case "la1":
          case "la2":
            regionUrl = "americas";
            break;
          case "oc1":
          case "jp1":
          case "kr":
            regionUrl = "asia";
            break;

          default:
            regionUrl = "europe";
            break;
        }

        const matchInfoRequests = matchesData
          .slice(0, 9) // Fetch only the last 5 matches
          .map((matchId) =>
            fetch(
              `https://${regionUrl}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${API}`
            ).then((response) => response.json())
          );

        const matchesInfo = await Promise.all(matchInfoRequests);
        setMatchesInfo(matchesInfo);
      }
    };

    fetchMatchesInfo();
  }, [matchesData, region]);

  return (
    <div>
      <h2>Match History</h2>
      {matchesInfo.map((matchInfo, index) => {
        const participants = matchInfo?.info?.participants;
        const metadataParticipants = matchInfo?.metadata?.participants;
        const participantIndex = metadataParticipants.findIndex(
          (p) => p === puuid
        );
        const winStatus =
          participants &&
          metadataParticipants &&
          participants[participantIndex]?.win
            ? "WIN"
            : "LOSE";
        const championName =
          participants &&
          metadataParticipants &&
          participants[participantIndex]?.championName;

        return (
          <div className={`match-history ${winStatus}`} key={index}>
            <div className="matchTypeInfo">
              <span className="gameType">
                {matchInfo &&
                  matchInfo.info.queueId === 420 &&
                  "Solo Queue 5v5"}
                {matchInfo &&
                  matchInfo.info.queueId === 400 &&
                  "Normal Game 5v5"}
                {matchInfo &&
                  matchInfo.info.queueId === 430 &&
                  "Flex Queue 5v5"}
                {matchInfo && matchInfo.info.queueId === 450 && "ARAM 5v5"}
              </span>

              <p>{winStatus}</p>
              {`${Math.floor(matchInfo.info.gameDuration / 60)}:${
                matchInfo.info.gameDuration % 60
              } min`}
            </div>
            <div className="champion-played">
              <div>
                {championName && (
                  <img
                    className="champPlayed"
                    src={`http://ddragon.leagueoflegends.com/cdn/13.12.1/img/champion/${championName}.png`}
                    alt="champion"
                  />
                )}
                {championName &&
                  matchInfo.info.participants[participantIndex].kills}{" "}
                /{" "}
                {championName &&
                  matchInfo.info.participants[participantIndex].deaths}
                /{" "}
                {championName &&
                  matchInfo.info.participants[participantIndex].assists}
              </div>

              <div className="kda"></div>
              <div className="champLevel">
                <p>
                  {championName &&
                    matchInfo.info.participants[participantIndex].champLevel}
                </p>
              </div>
              <div className="items">
                {[0, 1, 2, 3, 4, 5, 6].map((index) => {
                  const participantIndex = metadataParticipants.findIndex(
                    (p) => p === puuid
                  );
                  const item =
                    participantIndex !== -1
                      ? matchInfo.info.participants[participantIndex][
                          `item${index}`
                        ]
                      : null;

                  return (
                    <img
                      className="itemsBought"
                      src={`https://ddragon.leagueoflegends.com/cdn/13.12.1/img/item/${item}.png`}
                      alt="item"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                      key={index}
                    />
                  );
                })}
              </div>
            </div>

            <div className="players1">
              {participants?.slice(0, 5).map((participant) => (
                <div key={participant.summonerName}>
                  {
                    <img
                      className="champPlayers"
                      src={`http://ddragon.leagueoflegends.com/cdn/13.12.1/img/champion/${participant.championName}.png`}
                      alt="champion"
                    />
                  }{" "}
                  <div>{participant.summonerName}</div>
                </div>
              ))}
            </div>
            <div className="players2">
              {participants?.slice(5, 10).map((participant) => (
                <div key={participant.summonerName}>
                  {
                    <img
                      className="champPlayers"
                      src={`http://ddragon.leagueoflegends.com/cdn/13.12.1/img/champion/${participant.championName}.png`}
                      alt="champion"
                    />
                  }
                  {participant.summonerName}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Match;
