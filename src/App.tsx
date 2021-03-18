import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import './InputField.css';
import ReactJson from "react-json-view";
import { CredifyOffer } from "credify-web-react";


// TEST APP configuration
const api = "http://localhost:8000";

const cnf = {
  orgId: "b09e8f99-6d89-4e7d-83ea-a43a1787b3e0",
  apiKey:
    "WaXSjOqK0JqSOH1VJ6Op1kkQTdPAhffv5bflck7SzwRjCK0MqUmjSHyvfAan3djf",
  getUserAPI: `https://dev-demo-api.credify.one/sendo/demo-user`,
  createUrl: `https://dev-demo-api.credify.one/sendo/create`,
};

function App() {
  const [user, setUser] = useState(null);

  const handleClick = async () => {
    const offer = document.getElementById("credify");
    // @ts-ignore
    const list = await offer.getOffersList();
    console.log(list);
    // @ts-ignore
    offer.show();
  };

  const [claims, setClaims] = useState(null);

  useEffect(() => {
    const search = window.location.search;
    let id;
    let api = cnf.getUserAPI;
    if (search.includes("id=")) {
      id = search.split("id=")[1];
    }
    if (id) {
      api = `${api}?id=${id}`;
    }
    fetch(api)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const offer = document.getElementById("credify");
        // @ts-ignore
        offer.setUser(
          `${data.id}`,
          data.phoneNumber,
          data.phoneCountryCode,
          data.email,
          data.firstName,
          data.lastName,
          data.credifyId
        );
        setUser(data);
      });
  }, []);

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
      <CredifyOffer
        id="credify"
        organizationId={cnf.orgId}
        apiKey={cnf.apiKey}
        env="development"
        createUrl={cnf.createUrl}
      />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <button className="App-link" onClick={handleClick}>
          Open a random offer - serviceX
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
