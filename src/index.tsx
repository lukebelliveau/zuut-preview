import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { Auth0Provider } from '@auth0/auth0-react';
import { new_playground_path } from './routes/playgrounds/NewPlayground/EnterName';
import { HelmetProvider } from 'react-helmet-async';

const AUTH0_DOMAIN = 'dev-baqlbrdt.us.auth0.com';
const AUTH0_CLIENT_ID = 'ZiG0fuIV7rhOvYedlOXAL5wwl6FyLHid';

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <Auth0Provider
        domain={AUTH0_DOMAIN}
        clientId={AUTH0_CLIENT_ID}
        redirectUri={`${window.location.origin}${new_playground_path()}`}
      >
        <Provider store={store}>
          <App />
        </Provider>
      </Auth0Provider>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
