import "./App.css";
import { useState } from "react";

function App() {
  const [tweet, setTweet] = useState("");
  const [sentiment, setSentiment] = useState("");

  const handleSubmit = async () => {
    await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_KEY}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: `What is the sentiment fo this tweet? ${tweet}`,
        temperature: 0,
        max_tokens: 60,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      }),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        setSentiment(data.choices[0].text.trim());
      });
  };

  return (
    <div className="App">
      <div>
        <textarea
          placeholder="Paste your tweet here!"
          cols={50}
          rows={10}
          onChange={(e) => setTweet(e.target.value)}
        />
      </div>
      <button onClick={handleSubmit}>Get Sentiment From OpenAI API</button>
      {sentiment !== "" ? <h3>This Tweet is: {sentiment}</h3> : null}
    </div>
  );
}

export default App;
