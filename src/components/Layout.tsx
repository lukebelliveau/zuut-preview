import React from 'react';

import './Layout.css';
import ZuutLogo from '../images/zuut-logo.svg';

import LogoutButton from './LogoutButton';

import PlanRepository from '../lib/plan/planRepository';
import Sidebar from './Sidebar';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout(props: LayoutProps) {
  const plan = PlanRepository.forRedux().default();
  if (!plan) return <></>;

  return (
    <div className="wrapper">
      <header>
        <div id="header-logo">
          <img id="logo" src={ZuutLogo} alt="Zuut Logo" aria-hidden="true" />
        </div>
        <div id="header-name">
          <h1>Name: {plan.name}</h1>
        </div>
        <div id="header-auth">
          <LogoutButton />
        </div>
      </header>
      <div id="sidebar">
        <Sidebar />
      </div>
      <div id="content">
        {props.children}
      </div>
    </div>
  );
}
