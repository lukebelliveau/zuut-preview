import { useDispatch } from 'react-redux';

import { useSelectAllItemEntities } from '../../features/plans/planSelectors';
import { update, create as createPlan } from '../../features/plans/planSlice';
import { PlanState, RoomState } from '../../features/plans/planState';
import { IPlanAdapter } from './IPlanAdapter';

const usePlanAdapter = (): IPlanAdapter => {
  const dispatch = useDispatch();
  const itemEntities = useSelectAllItemEntities();

  const create = (plan: PlanState) => {
    dispatch(createPlan(plan));
  };

  const updateName = (plan: PlanState, name: string) => {
    dispatch(
      update({
        id: plan.id,
        changes: {
          name,
        },
      })
    );
  };

  const updateRoom = (plan: PlanState, width: number, length: number) => {
    dispatch(
      update({
        id: plan.id,
        changes: {
          room: {
            width,
            length,
            height: undefined,
            x: 0,
            y: 0,
          },
        },
      })
    );
  };

  const selectById = (id: string) => {
    return itemEntities[id];
  };

  const getRoomCenter = (plan: PlanState) => {
    if (!plan.room) throw new Error('Tried to getCenter of room, but no room!');
    const x = (plan.room.width || 0) / 2;
    const y = (plan.room.length || 0) / 2;

    return { x, y };
  };

  return { create, updateName, updateRoom, selectById, getRoomCenter };
};

export default usePlanAdapter;
