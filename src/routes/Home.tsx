import React from 'react';

import './Home.css';
import ZuutLogo from '../images/zuut-logo.svg';
import LoginButton from '../components/LoginButton';

export const homePath = () => '/';

function Home() {
  return (
    <div className="home-wrapper">
      <header>
        <div id="header-logo">
          <img id="logo" src={ZuutLogo} alt="Zuut Logo" />
        </div>
        <div id="header-auth">
          <LoginButton />
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
          <a className="button go" href="/playgrounds/new">Get started</a>
        </section>
      </div>
    </div>
  );
}

export default Home;