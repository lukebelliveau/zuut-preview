import React from 'react';
import ReactDOM from 'react-dom';
import mixpanel from 'mixpanel-browser';

import './index.css';

import App from './App';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { Auth0Provider } from '@auth0/auth0-react';
import { HelmetProvider } from 'react-helmet-async';
import { new_playground_path } from './routes/playgrounds/NewPlayground';
import { store } from './app/store';

const AUTH0_DOMAIN = 'dev-baqlbrdt.us.auth0.com';
const AUTH0_CLIENT_ID = 'ZiG0fuIV7rhOvYedlOXAL5wwl6FyLHid';

// if (process.env.REACT_APP_MIXPANEL_TOKEN) {
//   mixpanel.init(process.env.REACT_APP_MIXPANEL_TOKEN, {
//     debug: true,
//     ignore_dnt: true,
//   });
// }

// sloppy!
mixpanel.init('8e6a75065b59fcc16af32951e8340a92', {
  debug: true,
  ignore_dnt: true,
});

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <Auth0Provider
        useRefreshTokens={true}
        cacheLocation="localstorage"
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
