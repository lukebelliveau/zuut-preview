import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './Layout.css';
import ZuutLogo from '../images/zuut-logo.svg';

import LogoutButton from './LogoutButton';
import { selectById as selectPlanById } from '../features/plans/planSelectors';
import { selectPlayground } from '../features/playgrounds/playgroundSelector';
import { homePath } from '../routes/Home';
import { store } from '../app/store';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout(props: LayoutProps) {
  const navigate = useNavigate();
  const playground = useSelector(selectPlayground);
  const planId = playground.planId;
  if (!planId) {
    navigate(homePath());
    return <></>;
  }

  const plan = selectPlanById(store.getState(), planId);
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
