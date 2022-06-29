import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';

import './Home.css';
import ZuutLogo from '../images/zuut-logo.svg';

import LoginButton from '../components/LoginButton';
import Link from '../components/Link';
import { new_playground_path } from './playgrounds/NewPlayground';
import {
  demo_playground_path,
  playground_path,
} from './playgrounds/ShowPlayground';
import { getStarted } from '../features/playgrounds/playgroundSlice';
import { useDispatch } from 'react-redux';
import MobileWarningModal from '../components/MobileWarningModal';

export const homePath = () => '/';

function Home() {
  const { isAuthenticated } = useAuth0();
  const dispatch = useDispatch();

  function onGetStarted(e: React.MouseEvent) {
    e.preventDefault();
    dispatch(getStarted(true));
  }

  return (
    <div className="home-wrapper">
      <header>
        <div id="header-logo">
          <img id="logo" src={ZuutLogo} alt="Zuut Logo" aria-hidden="true" />
        </div>
        <div id="header-auth">
          {/* {isAuthenticated ? (
            <Link to={playground_path()} onClick={onGetStarted}>
              <button className="warning">Playground</button>
            </Link>
          ) : (
            <LoginButton />
          )} */}
          <Link to={demo_playground_path()}>
            <button>Demo</button>
          </Link>{' '}
        </div>
      </header>
      <div id="content">
        <section id="intro">
          <h5>ZUUT Grower Playground</h5>
          <h4>Design your grow.</h4>
          <h4>Pick your parts.</h4>
          <h4>Share with the Community.</h4>
          <p>
            ZUUT empowers you to design the perfect grow that is right for you,
            to choose top rated compatible parts for the cheapest prices, and to
            share your experience with the community.
          </p>
          {process.env.NODE_ENV === 'production' ? null : (
            <Link
              className="button go"
              to={new_playground_path()}
              onClick={onGetStarted}
            >
              Get started
            </Link>
          )}
        </section>
      </div>
      <MobileWarningModal />
    </div>
  );
}

export default Home;
