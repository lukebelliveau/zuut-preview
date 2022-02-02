import { useAppDispatch } from '../app/hooks';
import { useSelectPlanById } from '../features/plans/planSelectors';
import { PlanState } from '../features/plans/planState';
import { useSelectPlayground } from '../features/playgrounds/playgroundSelector';
import { update } from '../features/playgrounds/playgroundSlice';
import { PlaygroundState } from '../features/playgrounds/playgroundState';

type ZoomParams = {
  mouseX: number;
  mouseY: number;
  stageX: number;
  stageY: number;
};

const SCALE_MODIFIER = 20;

const widthScaleFactor = (
  playground: PlaygroundState,
  plan: PlanState | undefined
) => {
  const width = plan?.room?.width || 10;
  return width / (playground.displayWidth - SCALE_MODIFIER);
};

const lengthScaleFactor = (
  playground: PlaygroundState,
  plan: PlanState | undefined
) => {
  const length = plan?.room?.length || 10;
  return length / (playground.displayHeight - SCALE_MODIFIER);
};

export const computeInitialScale = (
  playground: PlaygroundState,
  plan: PlanState | undefined
) => {
  if (plan?.room) {
    return (
      1 /
      Math.max(
        widthScaleFactor(playground, plan),
        lengthScaleFactor(playground, plan)
      )
    );
  } else {
    return 1;
  }
};

const usePlaygroundAdapter = () => {
  const dispatch = useAppDispatch();
  const playground = useSelectPlayground();
  if (!playground.planId) throw new Error('No planId!');
  const plan = useSelectPlanById(playground.planId);

  const zoomIn = (params: ZoomParams) => {
    zoom(params, 1.05);
  };

  const zoomOut = (params: ZoomParams) => {
    zoom(params, 0.95);
  };

  const setPlan = (plan: PlanState) => {
    const newPlayground = {
      ...playground,
      planId: plan.id,
    };

    dispatch(update(newPlayground));
  };

  const setPlayground = (newPlayground: PlaygroundState) => {
    dispatch(update(newPlayground));
  };

  const zoom = (params: ZoomParams, scaleFactor: number) => {
    const oldScale = playground.scale;
    const newScale = playground.scale * scaleFactor;

    const mousePointTo = {
      x: (params.mouseX - params.stageX) / oldScale,
      y: (params.mouseY - params.stageY) / oldScale,
    };

    const newPlayground = {
      ...playground,
      scale: newScale,
      centerX: params.mouseX - mousePointTo.x * newScale,
      centerY: params.mouseY - mousePointTo.y * newScale,
    };

    dispatch(update(newPlayground));
  };

  const setDisplayDimensions = (width: number, height: number) => {
    const playgroundWithUpdatedDimensions = {
      ...playground,
      displayWidth: width,
      displayHeight: height,
    };

    const initialScale = computeInitialScale(
      playgroundWithUpdatedDimensions,
      plan
    );

    const playgroundWithUpdatedScale = {
      ...playgroundWithUpdatedDimensions,
      scale: initialScale,
    };

    dispatch(update(playgroundWithUpdatedScale));
  };

  return { zoomIn, zoomOut, setPlan, setPlayground, setDisplayDimensions };
};

export default usePlaygroundAdapter;
