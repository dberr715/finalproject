import "../index.css";
import AIresponse from "./AIResponse";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomeText() {
  const navigate = useNavigate();
  const [searchedTeam, setSearchedTeam] = useState("");

  const handleSearch = (team) => {
    setSearchedTeam(team);
  };

  const [team, setTeam] = useState("");
  const handleInputChange = (e) => {
    setTeam(e.target.value);
  };

  const handleSearchClick = () => {
    handleSearch(team);
    navigate(`/team/${team}`, { team });
  };

  return (
    <div className="main-container">
      <div className="maincopy">
        <h1>Welcome to FootyMatch!</h1>
        <h3>Your Gateway to the World of Soccer.</h3>

        <p>
          Do you love sports like basketball, baseball, or hockey? We'll help
          you discover your perfect soccer team based on the sports you already
          love. Whether you're a die-hard fan or just curious about the world of
          soccer, we've got you covered. Get ready to find your new favorite
          soccer team and dive into the excitement of the beautiful game!
        </p>

        <p>Type 1 or more sports teams in to find your soccer team match! </p>
        <AIresponse />

        <div className="search-container">
          <h4>Already have a team?</h4>
          <p>Search for it below!</p>

          <input
            type="text"
            value={team}
            onChange={handleInputChange}
            placeholder="🔍"
          />
          <button type="submit" onClick={handleSearchClick}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
