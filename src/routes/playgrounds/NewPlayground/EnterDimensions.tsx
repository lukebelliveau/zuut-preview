import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import LayoutIcon from '../../../images/glyphs/layout.svg';
import './EnterDimensions.css';

import { update } from '../../../features/plans/planSlice';
import Plan from '../../../lib/plan';
import { planStateBuilder } from '../../../features/plans/planReduxAdapter';
import PillInput from '../../../components/PillInput';
import { playground_path } from '../ShowPlayground';
import Section from './Section';
import { feetToMm } from '../../../lib/conversions';
import { useSandboxPlan } from '../../../app/hooks';

export const new_playground_path = () => '/playgrounds/new';

type EnterDimensionsProps = {
  nextPage: () => void;
}

type CreateLayoutFormParams = {
  width: number;
  length: number;
  height: number;
}

export default function EnterDimensions(props: EnterDimensionsProps) {
  const plan = useSandboxPlan();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<CreateLayoutFormParams>();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<CreateLayoutFormParams> = data => {
    const newPlan = new Plan(
      plan.name,
      feetToMm(data.width),
      feetToMm(data.length),
      feetToMm(data.height),
      plan.id,
    );
    dispatch(update({ id: newPlan.id, changes: planStateBuilder(newPlan) }));
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
      <div className="dimension">
        <PillInput
          name="height"
          label="room height"
          registrationOptions={register('height', { required: true })}
          description="ft" />
      </div>
      <div className="create-button">
        <button className="primary" onClick={handleSubmit(onSubmit)}>
          <img alt="Layout icon" src={LayoutIcon} />
          <span>Create new layout</span>
        </button>
      </div>
    </Section>
  </>);
}
