import React from 'react';

type MenuTabProps = {
  title: string
  id: string
}

const SingleMenuTab: React.FC<MenuTabProps> = ({ children }) => {
  return <div className='contentSection '>{children}</div>;
};

export default SingleMenuTab;