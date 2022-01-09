import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './Layout.css';
import LogoutButton from './LogoutButton';
import { new_playground_path } from '../routes/playgrounds/NewPlayground';
import { playground_path } from '../routes/playgrounds/ShowPlayground';
import { selectPlan } from '../features/playgroundPlan/playgroundSelectors';

type LayoutProps = {
  children: React.ReactNode;
  header: string | React.ReactNode;
};

export default function Layout(props: LayoutProps) {
  const playground = useSelector(selectPlan);
  const playgroundLink = playground ? playground_path() : new_playground_path();

  return (
    <div className="wrapper">
      <header>
        <img id="logo" src="/logo.png" alt="GreenGrids Logo" />
        <h1>Zuut</h1>
      </header>
      <div id="sidebar">
        <div id="dashboard-accordian">
          Dashboard
        </div>
        <nav>
          <ul>
            {/* <li>
              <Link to="/workplace">Workplace</Link>
            </li> */}
            <li>
              <Link to="/shopping">Shopping List</Link>
            </li>
            <li>
              <Link to={playgroundLink}>Playground</Link>
            </li>
            <li>
              <LogoutButton />
            </li>
          </ul>
        </nav>
      </div>
      <div id="content">
        <div id="subheading">
          <h2>{props.header}</h2>
        </div>
        {props.children}
      </div>
    </div>
  );
}
