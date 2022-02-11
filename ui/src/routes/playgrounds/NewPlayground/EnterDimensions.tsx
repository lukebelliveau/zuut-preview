import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import LayoutIcon from '../../../images/glyphs/layout.svg';
import './EnterDimensions.css';

import Plan from '../../../lib/plan';
import PillInput from '../../../components/PillInput';
import { playground_path } from '../ShowPlayground';
import Section from './Section';
import { feetToMm } from '../../../lib/conversions';
import { update } from '../../../features/plans/planSlice';
import PlanReduxAdapter from '../../../lib/plan/planReduxAdapter';
import { useDispatch } from 'react-redux';
import { useSelectDefaultPlan } from '../../../features/plans/planSelectors';

export const new_playground_path = () => '/playgrounds/new';

type CreateLayoutFormParams = {
  width: number;
  length: number;
}

export default function EnterDimensions() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<CreateLayoutFormParams>();

  const plan = PlanReduxAdapter.stateToPlan(useSelectDefaultPlan());

  const onSubmit: SubmitHandler<CreateLayoutFormParams> = data => {
    const newPlan = new Plan(
      plan?.name,
      feetToMm(data.width),
      feetToMm(data.length),
      undefined,
      plan?.id,
    );
    
    dispatch(update({ id: plan.id, changes: PlanReduxAdapter.planToState(newPlan) }));
    navigate(playground_path());
  };

  return (<>
    <Section>
      <h2>Tell me about your grow area</h2>
      <div className="dimension">
        <PillInput
          name="length"
          label="room length"
          registrationOptions={register('length', { required: true })}
          description="ft" />
      </div>
      <div className="dimension">
        <PillInput
          name="width"
          label="room width"
          registrationOptions={register('width', { required: true })}
          description="ft" />
      </div>
      <div className="create-button">
        <button className="primary" onClick={handleSubmit(onSubmit)}>
          <img alt="Layout icon" src={LayoutIcon} aria-hidden="true" />
          <span>Create new layout</span>
        </button>
      </div>
    </Section>
  </>);
}

