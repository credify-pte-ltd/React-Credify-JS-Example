import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { oidcUrl, Config } from "@credify/credify-js";

// TEST APP configuration
const config: Config = {
  apiKey: "bufIgxAyApnAVUdeZjyEfWXjbOhrEYTSBe3rGzqNbiDEJDtQBpALMumG2n92Q6lF",
  mode: "sandbox" // If you are using Production, it will be `production`.
};

function App() {

  const loginUrl = oidcUrl(
    "c03eaedd-2a22-42ad-a61f-c791d66b30c8",
    "http://localhost:3000/callback",
    ["openid", "profile", "phone", "email"],
    config
  );
  const api = "http://localhost:8000";

  useEffect(() => {
    const match = /access_token=([-\.\w]+)&?/g.exec(window.location.hash);
    console.log(`callback:token -> ${match && match[1]}`);
    const accessToken = match && match[1];

    if (accessToken) {
      fetch(api, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "post",
        body: JSON.stringify({ access_token: accessToken })
      }).then((result) => {
        result.json().then((json) => {
          console.log(json);
        });
      }).catch((err) => {
        console.log(err);
      })
    }
  }, [window.location]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href={loginUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Login with Credify
        </a>
      </header>
    </div>
  );
}

export default App;
