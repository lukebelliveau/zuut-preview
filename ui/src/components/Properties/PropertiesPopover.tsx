import { useState } from 'react';

import './Properties.css';

import { onReturnKey } from '../../lib/interactions/keyboard';
import { useSelectDefaultPlan } from '../../features/plans/planSelectors';
import PlanReduxAdapter from '../../lib/plan/planReduxAdapter';
import { useDispatch } from 'react-redux';
import { update as updatePlan } from '../../features/plans/planSlice';
import { isDemoMode } from '../../app/store';
import { feetToMm, mmToFeet } from '../../lib/conversions';

// const Properties = () => {
//   const planState = useSelectDefaultPlan();
//   const plan = PlanReduxAdapter.stateToPlan(planState);
//   const [show, setShow] = useState(true);
//   const [name, setName] = useState(plan.name || '');
//   const [length, setLength] = useState(
//     mmToFeet(plan.room.length).toString() || ''
//   );
//   const [width, setWidth] = useState(
//     mmToFeet(plan.room.width).toString() || ''
//   );
//   const dispatch = useDispatch();

//   if (!isDemoMode()) return null;

//   const toggleShow = () => {
//     setShow(!show);
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
//     e.stopPropagation();
//   };

//   const updateProperties = (e: any) => {
//     dispatch(
//       updatePlan({
//         id: plan.id,
//         changes: {
//           name,
//           room: {
//             length: feetToMm(parseInt(length)),
//             width: feetToMm(parseInt(width)),
//             offset: plan.room.offset,
//           },
//         },
//       })
//     );

//     e.preventDefault();
//   };

//   return (
//     <div
//       id="properties"
//       className={show ? '' : 'minimize'}
//       onKeyDown={handleKeyDown}
//       role="presentation"
//     >
//       <h2>
//         <button onClick={toggleShow} onKeyDown={onReturnKey(toggleShow)}>
//           Properties
//         </button>
//       </h2>

//       <form onSubmit={updateProperties}>
//         <div className="properties-body">
//           <label htmlFor="name-input">Name</label>
//           <input
//             id="name-input"
//             name="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />

//           <label htmlFor="length-input">Length (ft)</label>
//           <input
//             id="length-input"
//             name="length"
//             value={length}
//             onChange={(e) => setLength(e.target.value)}
//           />

//           <label htmlFor="name-input">Width (ft)</label>
//           <input
//             id="width-input"
//             name="width"
//             value={width}
//             onChange={(e) => setWidth(e.target.value)}
//           />

//           <button
//             disabled={
//               !(
//                 name !== plan.name ||
//                 parseInt(width) !== plan.room.width ||
//                 parseInt(length) !== plan.room.length
//               )
//             }
//             aria-label="update properties"
//             tabIndex={-1}
//           >
//             Update Properties
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

const Properties = () => {
  const planState = useSelectDefaultPlan();
  const plan = PlanReduxAdapter.stateToPlan(planState);
  const [show, setShow] = useState(true);
  const [name, setName] = useState(plan.name || '');
  const [length, setLength] = useState(
    mmToFeet(plan.room.length).toString() || ''
  );
  const [width, setWidth] = useState(
    mmToFeet(plan.room.width).toString() || ''
  );
  const dispatch = useDispatch();

  if (!isDemoMode()) return null;

  const toggleShow = () => {
    setShow(!show);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    e.stopPropagation();
  };

  const updateProperties = (e: any) => {
    dispatch(
      updatePlan({
        id: plan.id,
        changes: {
          name,
          room: {
            length: feetToMm(parseInt(length)),
            width: feetToMm(parseInt(width)),
            offset: plan.room.offset,
          },
        },
      })
    );

    e.preventDefault();
  };

  return (
    <div
      id="properties"
      className={show ? '' : 'minimize'}
      onKeyDown={handleKeyDown}
      role="presentation"
    >
      <h2>
        <button onClick={toggleShow} onKeyDown={onReturnKey(toggleShow)}>
          Properties
        </button>
      </h2>

      <form onSubmit={updateProperties}>
        <div className="properties-body">
          <label htmlFor="name-input">Name</label>
          <input
            id="name-input"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="length-input">Length (ft)</label>
          <input
            id="length-input"
            name="length"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />

          <label htmlFor="name-input">Width (ft)</label>
          <input
            id="width-input"
            name="width"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
          />

          <button
            disabled={
              !(
                name !== plan.name ||
                parseInt(width) !== plan.room.width ||
                parseInt(length) !== plan.room.length
              )
            }
            aria-label="update properties"
            tabIndex={-1}
          >
            Update Properties
          </button>
        </div>
      </form>
    </div>
  );
};

export default Properties;
