import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import LayoutIcon from '../../../images/glyphs/layout.svg';
import './EnterDimensions.css';

import PillInput from '../../../components/PillInput';
import { playground_path } from '../ShowPlayground';
import Section from './Section';
import { PlanState } from '../../../features/plans/planState';
import usePlanAdapter from '../../../lib/plan/planAdapter';

export const new_playground_path = () => '/playgrounds/new';

type CreateLayoutFormParams = {
  width: number;
  length: number;
};

export default function EnterDimensions({ plan }: { plan: PlanState }) {
  const navigate = useNavigate();
  const { updateRoom } = usePlanAdapter();
  const { register, handleSubmit } = useForm<CreateLayoutFormParams>();

  const onSubmit: SubmitHandler<CreateLayoutFormParams> = (data) => {
    updateRoom(plan, data.width, data.length);

    navigate(playground_path());
  };

  if (!plan) return <></>;

  return (
    <>
      <Section>
        <h2>Tell me about your grow area</h2>
        <div className="dimension">
          <PillInput
            name="length"
            label="room length"
            registrationOptions={register('length', { required: true })}
            description="ft"
          />
        </div>
        <div className="dimension">
          <PillInput
            name="width"
            label="room width"
            registrationOptions={register('width', { required: true })}
            description="ft"
          />
        </div>
        <div className="create-button">
          <button className="primary" onClick={handleSubmit(onSubmit)}>
            <img alt="Layout icon" src={LayoutIcon} aria-hidden="true" />
            <span>Create new layout</span>
          </button>
        </div>
      </Section>
    </>
  );
}
