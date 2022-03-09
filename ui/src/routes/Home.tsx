import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

import './Home.css';
import ZuutLogo from '../images/zuut-logo.svg';

import LoginButton from '../components/LoginButton';
import Link from '../components/Link';
import { new_playground_path } from './playgrounds/NewPlayground';
import { playground_path } from './playgrounds/ShowPlayground';

export const homePath = () => '/';

function Home() {
  const { isAuthenticated, getIdTokenClaims } = useAuth0();
  const dispatch = useDispatch();

  async function onGetStartedClick(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const jwt = await getIdTokenClaims();

    if (jwt) {
      dispatch(push(playground_path()));
    } else {
      dispatch(push(new_playground_path()));
    }
  }

  return (
    <div className="home-wrapper">
      <header>
        <div id="header-logo">
          <img id="logo" src={ZuutLogo} alt="Zuut Logo" aria-hidden="true" />
        </div>
        <div id="header-auth">
          {isAuthenticated ? 
            <Link to={playground_path()}>Playground</Link> :
            <LoginButton />
          }
        </div>
      </header>
      <div id="content">
        <section id="intro">
          <h5>ZUUT Grower Playground</h5>
          <h2>Design and plan your grow.</h2>
          <p>
            ZUUT empowers first time growers &amp;
            seasonded cultivators to design &amp;
            plan your grow while maximizing yields &amp;
            minimizing costs.
          </p>
          <Link className="button go" to={new_playground_path()} onClick={onGetStartedClick}>Get started</Link>
        </section>
      </div>
    </div>
  );
}

export default Home;