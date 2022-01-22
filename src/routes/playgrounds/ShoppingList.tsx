import { useState } from 'react';
import './ShoppingList.css';

export default function ShoppingList() {
  const [hidden, setHidden] = useState(false);
  const className = hidden ? 'hidden' : undefined;

  return <section id="shopping-list" className={className}>
    <h2>
      <button onClick={() => setHidden(!hidden)} onKeyDown={(e) => { if (e.key === 'Return') setHidden(!hidden); }}>
        Shopping List
      </button>
    </h2>
    <div className="shopping-list-body">
      <ul>
        <li>Carbon filter</li>
      </ul>
    </div>
  </section>;
}