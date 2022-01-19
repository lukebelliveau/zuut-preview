import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import LayoutIcon from '../../../images/glyphs/layout.svg';
import './EnterDimensions.css';

import Plan from '../../../lib/plan';
import PillInput from '../../../components/PillInput';
import { playground_path } from '../ShowPlayground';
import Section from './Section';
import { feetToMm } from '../../../lib/conversions';
import PlanRepository from '../../../lib/plan/planRepository';

export const new_playground_path = () => '/playgrounds/new';

type EnterDimensionsProps = {
  nextPage: () => void;
}

type CreateLayoutFormParams = {
  width: number;
  length: number;
  height: number;
}

const planRepo = PlanRepository.forRedux();

export default function EnterDimensions(props: EnterDimensionsProps) {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<CreateLayoutFormParams>();

  const onSubmit: SubmitHandler<CreateLayoutFormParams> = data => {
    const currentPlan = planRepo.default();
    const newPlan = new Plan(
      currentPlan?.name,
      feetToMm(data.width),
      feetToMm(data.length),
      feetToMm(data.height),
      currentPlan?.id,
    );
    planRepo.update(newPlan);
    navigate(playground_path());
  };

  const plan = planRepo.default();
  if (!plan) return <></>;

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

