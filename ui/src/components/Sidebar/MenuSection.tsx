/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';

import './MenuSection.css';

type MenuSectionProps = {
  title: string;
  children: React.ReactNode;
}

export default function MenuSection({ title, children }: MenuSectionProps) {
  const [open, setOpen] = useState(true);

  // Fix CSS for accordion panels
  return (
    <div className={`accordion-item ${open ? 'active' : ''}`}>
      <div className="accordion-title">
        <button onClick={() => setOpen(!open)}>
          {title}
          <span className="control">{open ? '   -' : '   +' } </span>
        </button>
      </div>
      {open ?
        <div className="accordion-content">
          {children}
        </div>
        : <></>
      }
    </div>
  );
};

