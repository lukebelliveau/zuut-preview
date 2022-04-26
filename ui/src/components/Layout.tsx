import React from 'react';

import Feedback from 'feeder-react-feedback'; // import Feedback component
import 'feeder-react-feedback/dist/feeder-react-feedback.css'; // import stylesheet

import './Layout.css';
import ZuutLogo from '../images/zuut-logo.svg';

import LogoutButton from './LogoutButton';

import Sidebar from './Sidebar';
import { useSelectDefaultPlan } from '../features/plans/planSelectors';
import Link from './Link';
import Inventory from './Inventory';

import { useAuth0 } from '@auth0/auth0-react';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout(props: LayoutProps) {
  const plan = useSelectDefaultPlan();
  const { user } = useAuth0();
  if (!plan) return <></>;

  return (
    <div className="wrapper">
      <header>
        <div id="header-logo">
          <Link to="/">
            <img id="logo" src={ZuutLogo} alt="Zuut Logo" aria-hidden="true" />
          </Link>
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
      <div id="content">{props.children}</div>
      <Inventory />
      <Feedback
        projectId="6267e6a8b4e0a100041f4471"
        emailDefaultValue={user?.email}
        email
      />
    </div>
  );
}
