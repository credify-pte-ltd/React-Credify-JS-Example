# Credify Web Example (React.js)

This project is an example project of Credify Web for React.js.

## How to use

```shell script
# Install dependencies
$ yarn

# Run a project
$ yarn start
```

Hardcoded app config (`App.tsx`) is already registered as an OpenID Connect client in Credify sandbox system.


## How to use Credify Web

```shell script
$ yarn add credify-web
$ yarn add credify-web-react
```

First, you need to call `defineCustomElements()` in your application.

```javascript
/// index.ts or index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Additional lines
import { applyPolyfills, defineCustomElements } from 'credify-web/loader';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

// Additional lines
applyPolyfills().then(() => {
  defineCustomElements();
});
```

You need to pass user information like following.

```javascript
const offer = document.getElementById("credify");
offer.setUser(
  `${data.id}`,
  data.phoneNumber,
  data.phoneCountryCode,
  data.email,
  data.firstName,
  data.lastName,
  data.credifyId
);
```

You can display the offer like following.

```javascript
const handleClick = async () => {
  const offer = document.getElementById("credify");
  const list = await offer.getOffersList();
  console.log(list);
  offer.show();
};
```

The follwoing is an example of CredifyOffer element.

This configuration is set in the web console.

```javascript
const cnf = {
  orgId: "b09e8f99-6d89-4e7d-83ea-a43a1787b3e0",
  apiKey:
    "WaXSjOqK0JqSOH1VJ6Op1kkQTdPAhffv5bflck7SzwRjCK0MqUmjSHyvfAan3djf",
  getUserAPI: `https://dev-demo-api.credify.one/sendo/demo-user`,
  createUrl: `https://dev-demo-api.credify.one/sendo/create`,
};
```

```javascript
// JSX
<CredifyOffer id="credify" organizationId={cnf.orgId} apiKey={cnf.apiKey} env="development"
createUrl={cnf.createUrl} />
```
