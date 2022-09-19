import { useState } from 'react';

// import './Properties.css';

import { useSelectDefaultPlan } from '../../redux/features/plans/planSelectors';
import PlanReduxAdapter from '../../lib/plan/planReduxAdapter';
import { update as updatePlan } from '../../redux/features/plans/planSlice';
import { isDemoMode, useDispatch } from '../../redux/store';
import { feetToMm, mmToFeet } from '../../lib/conversions';
import { hackyRecenterPlayground } from '../../redux/features/playgrounds/playgroundSlice';
import { Button, styled, TextField } from '@mui/material';
import FullScreenButton from './FullScreenButton';
import RecenterButton from './RecenterButton';

const DimensionTextField = styled(TextField)({
  margin: 10,
});

const Dimensions = () => {
  const planState = useSelectDefaultPlan();
  const plan = PlanReduxAdapter.stateToPlan(planState);
  const [show, setShow] = useState(true);
  const [name, setName] = useState(plan.name || '');
  const [length, setLength] = useState(mmToFeet(plan.room.length).toString() || '');
  const [width, setWidth] = useState(mmToFeet(plan.room.width).toString() || '');
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
    dispatch(hackyRecenterPlayground());
  };

  return (
    <div
      id="properties"
      className={show ? '' : 'minimize'}
      onKeyDown={handleKeyDown}
      role="presentation"
    >
      {/* <Typography>
        <button onClick={toggleShow} onKeyDown={onReturnKey(toggleShow)}>
          Dimensions
        </button>
      </Typography> */}

      <form onSubmit={updateProperties}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {isDemoMode() ? null : (
            <>
              <DimensionTextField
                id="name-input"
                name="name"
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </>
          )}

          <DimensionTextField
            id="length-input"
            name="length"
            label="Length (ft)"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />

          <DimensionTextField
            id="width-input"
            name="width"
            label="Width (ft)"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
          />

          <input type="submit" hidden />
          <Button
            disabled={
              !(parseInt(width) !== plan.room.width || parseInt(length) !== plan.room.length)
            }
            aria-label="update dimensions"
            onClick={updateProperties}
            sx={{
              display: 'flex',
            }}
          >
            Update Dimensions
          </Button>
          <div
            style={{
              display: 'flex',
            }}
          >
            <RecenterButton />
            <FullScreenButton />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Dimensions;
