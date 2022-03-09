import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

interface LinkProps {
  id?: string;
  className?: string;
  to: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

export default function Link({ children, className, id, to, onClick }: LinkProps) {
  const dispatch = useDispatch();

  function defaultOnClick(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    dispatch(push(to));
  }

  return (
    <a id={id} className={className} href={to} onClick={onClick || defaultOnClick}>
      {children}
    </a>
  );
}