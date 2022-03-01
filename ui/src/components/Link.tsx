import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

interface LinkProps {
  id?: string;
  className?: string;
  to: string;
  children: React.ReactNode;
}

export default function Link({ children, className, id, to }: LinkProps) {
  const dispatch = useDispatch();

  return (
    <a id={id} className={className} href={to} onClick={ (e) => { e.preventDefault(); dispatch(push(to)); } }>
      {children}
    </a>
  );
}