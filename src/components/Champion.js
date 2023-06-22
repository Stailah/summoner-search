import React, { useState, useEffect } from "react";

export const Champion = () => {
  const [championNames, setChampionNames] = useState([]);
  const [patchVersion, setPatchVersion] = useState("");

  useEffect(() => {
    fetch("https://ddragon.leagueoflegends.com/api/versions.json")
      .then((response) => response.json())
      .then((data) => {
        const version = data[0];
        setPatchVersion(version);

        fetch(
          `http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
        )
          .then((response) => response.json())
          .then((data) => {
            const names = Object.keys(data.data);
            setChampionNames(names);
          });
      });
  }, []);

  return (
    <div className="champion-component">
      {championNames.map((championName) => (
        <div key={championName}>
          <img
            className="championImage glow-wrap"
            src={`http://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/champion/${championName}.png`}
            alt={championName}
          />
          <div>{championName}</div>
        </div>
      ))}
    </div>
  );
};
