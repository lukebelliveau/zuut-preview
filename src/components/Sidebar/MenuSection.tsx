/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';

type MenuSectionProps = {
  title: string;
  children: React.ReactNode;
}

export default function MenuSection({ title, children }: MenuSectionProps) {
  const [open, setOpen] = useState(true);

  // Fix CSS for accordion panels
  return (
    <div className={`accordion_item ${open ? 'active' : ''}`}>
      <div>
        <button className="button" onClick={() => setOpen(!open)}>
          {title}
          {/* Change to caret icons using Semantic UI */}
          <span className="control">{open ? '   -' : '   +' } </span>
        </button>
      </div>
      <div aria-hidden={!open} className={`items_wrapper ${open ? 'open' : ''}`}>
        {children}
      </div>
    </div>
  );
};

