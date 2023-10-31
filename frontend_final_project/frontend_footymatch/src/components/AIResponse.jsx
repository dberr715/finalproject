import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";

export default function AIResponse() {
  const key = import.meta.env.VITE_OPENAI_API_KEY;
  const [inputText, setInputText] = useState("");
  const [rec, setRec] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-4",
            messages: [
              {
                role: "user",
                content:
                  "In the next prompt, I will give 1+ non-soccer sports teams, and I want you to make a recommendation of a soccer team that I should follow. Tell 1 team name that fits all the input teams I entered and 2 sentences why this would be a good team to follow. After I give you teams, let the first response line be just the team name. Limit your choices to teams in the EPL, La Liga, Bundesliga, Ligue1, or Serie A",
              },
              {
                role: "user",
                content: inputText,
              },
            ],
          }),
        }
      );

      const data = await response.json();

      setRec(data.choices[0].message.content);
    } catch (error) {
      console.log("Unable to fetch data: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="🏀🏈⚾️🎾"
        value={inputText}
        onChange={handleInputChange}
      />
      <button className="match" onClick={fetchData}>
        Submit
      </button>
      {isLoading ? <Spinner /> : null}

      <div>{rec && <p>{rec}</p>}</div>
    </div>
  );
}
