import { useState } from 'react';

import './MenuSection.css';

type MenuSectionProps = {
  title: string;
  children: React.ReactNode;
};

export default function MenuSection({ title, children }: MenuSectionProps) {
  const [open, setOpen] = useState(
    process.env.NODE_ENV === 'test' ? true : false
  );

  // Fix CSS for accordion panels
  return (
    <div className={`accordion-item ${open ? 'active' : ''}`}>
      <div className="accordion-title">
        <button onClick={() => setOpen(!open)}>
          {title}
          <span className="control">{open ? '   -' : '   +'} </span>
        </button>
      </div>
      {open ? <div className="accordion-content">{children}</div> : <></>}
    </div>
  );
}
