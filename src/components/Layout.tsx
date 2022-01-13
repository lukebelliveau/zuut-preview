import React from 'react';
import { useNavigate } from 'react-router-dom';

import './Layout.css';
import ZuutLogo from '../images/zuut-logo.svg';

import LogoutButton from './LogoutButton';
import { homePath } from '../routes/Home';
import { useSandboxPlan } from '../app/hooks';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout(props: LayoutProps) {
  const navigate = useNavigate();

  const plan = useSandboxPlan();
  if (!plan) {
    navigate(homePath());
    return <></>;
  }

  return (
    <div className="wrapper">
      <header>
        <div id="header-logo">
          <img id="logo" src={ZuutLogo} alt="Zuut Logo" />
        </div>
        <div id="header-name">
          <h1>Name: {plan.name}</h1>
        </div>
        <div id="header-auth">
          <LogoutButton />
        </div>
      </header>
      <div id="sidebar">
        
      </div>
      <div id="content">
        {props.children}
      </div>
    </div>
  );
}
