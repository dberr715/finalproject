import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../index.css";

export default function TeamPage(props) {
  const params = useParams();
  const [teamName, setTeamName] = useState("");
  const [logo, setLogo] = useState("");
  const [country, setCountry] = useState("");
  const [stadium, setStadium] = useState("");
  const [stadiumPic, setStadiumPic] = useState("");
  const [error, setError] = useState(null);

  const addFavoriteTeam = async () => {
    const teamNameToAdd = teamName;

    if (props.isAuth) {
      const access_token = localStorage.getItem("access_token");
      const url = "http://localhost:8000/api/favorites/";

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify({ teamName: teamNameToAdd }),
        });

        if (response.ok) {
          console.log(`${teamNameToAdd} has been added to favorites.`);
        } else {
          console.error(`Failed to add ${teamNameToAdd} to favorites.`);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  async function fetchData1() {
    const key = import.meta.env.VITE_FOOTBALL_API_KEY;
    const nameUrl = `https://api-football-v1.p.rapidapi.com/v3/teams?name=${params.teamname}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": key,
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(nameUrl, options);

      if (response.ok) {
        const result = await response.json();
        const name = result.response[0].team.name;
        const logo = result.response[0].team.logo;
        const stadium = result.response[0].venue.name;
        const stadiumPic = result.response[0].venue.image;
        const country = result.response[0].team.country;
        setTeamName(name);
        setLogo(logo);
        setStadium(stadium);
        setStadiumPic(stadiumPic);
        setCountry(country);
      } else {
        setError("Team not found. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setError(
        "That is not a professional soccer team, please check your spelling and try again!"
      );
    }
  }

  useEffect(() => {
    fetchData1();
  }, [params.teamname]);

  return (
    <div>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <>
          <p>Country: {country}</p>
          <p>Team Name: {teamName}</p>
          <img src={logo} alt="Team Logo" />
          <p>Stadium Name: {stadium}</p>
          <img src={stadiumPic} alt="Stadium Pic" />
          {props.isAuth && (
            <button onClick={addFavoriteTeam}>Add to Favorites</button>
          )}
        </>
      )}
    </div>
  );
}
