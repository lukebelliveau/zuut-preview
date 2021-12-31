import React from 'react';
import { Link } from 'react-router-dom';

import './Layout.css';
import LogoutButton from './LogoutButton';

type LayoutProps = {
  children: React.ReactNode;
  header: String;
};

export default function Layout(props: LayoutProps) {
  return (
    <div className="wrapper">
      <header>
        <img id="logo" src="/logo.png" alt="GreenGrids Logo" />
        <h1>GreenGrids</h1>
      </header>
      <div id="sidebar">
        <div id="dashboard-accordian">
          Dashboard
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/playground">Playground</Link>
            </li>
            <li>
              <Link to="/shopping">Shopping List</Link>
            </li>
            <li>
              <Link to="/workplace">Workplace</Link>
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
        <div id="main">
          {props.children}
        </div>
      </div>
    </div>
  );
}
