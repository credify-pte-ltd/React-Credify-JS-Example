import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import './InputField.css';
import ReactJson from "react-json-view";

// TEST APP configuration
const api = "http://localhost:8000";

function App() {

  const handleClick = async () => {
    const q = phoneNumber ? `?phone_number=${phoneNumber}` : "";
    const res = await fetch(`${api}/oidc${q}`);
    // @ts-ignore
    const r = await res.json();
    console.log(r.url)
    window.open(r.url);
  };

  // @ts-ignore
  const handleTextChange = (event) => {
    const value = event.target.value;
    console.log(value);
    setPhoneNumber(value);
  }

  const [phoneNumber, setPhoneNumber] = useState("");
  const [claims, setClaims] = useState(null);

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
          setClaims(json);
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

        <div className="group">
          <input type="text" name="phoneNumber" onChange={handleTextChange} value={phoneNumber} placeholder="+843812345678" />
          <span className="highlight" />
          <span className="bar" />
          <label>Phone number (optional)</label>
        </div>

        <button className="App-link" onClick={handleClick}>
          Login with Credify
        </button>
        {claims && (
          <div className="Json-wrapper">
            <ReactJson src={claims!} theme="monokai" />
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
