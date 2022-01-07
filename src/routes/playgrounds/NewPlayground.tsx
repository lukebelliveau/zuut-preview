import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './NewPlayground.css';

import { feetToMm } from '../../lib/conversions';
import Layout from '../../components/Layout';
import { create } from '../../features/playgroundPlan/playgroundPlanSlice';
import { playground_path } from './ShowPlayground';
import Plan from '../../lib/plan';
import { planStateBuilder } from '../../features/playgroundPlan/playgourndPlanReduxAdapter';

export const new_playground_path = () => '/playgrounds/new';

export type CreatePlanParams = {
  name: string;
  height: number;
  length: number;
  width: number;
}

function formDataAdapter(params: CreatePlanParams): Plan {
  return new Plan(
    params.name,
    feetToMm(params.width),
    feetToMm(params.length),
    feetToMm(params.height),
  );
}

export default function NewPlayground() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<CreatePlanParams>();
  const dispatch = useDispatch();
  const onSubmit: SubmitHandler<CreatePlanParams> = data => {
    const plan = formDataAdapter(data);
    dispatch(create(planStateBuilder(plan)));
    navigate(playground_path());
  };

  return (
    <Layout header="Playground">
      <div id="sandbox">
        <div id="sandbox-container">
          <div id="new-playground-window">
            <form onSubmit={handleSubmit(onSubmit)}>
              <section id="new-playground">
                <div className="field-label field-name">
                  <label htmlFor="name">Grow Plan Name:</label>
                </div>
                <div className="field-value field-name-input">
                  <input placeholder="Give the grow plan a name" 
                    {...register('name', { required: true })} />
                </div>
                <div className="field-label field-dimensions">
                  Room Dimensions:
                </div>
                <div className="field-value field-dimensions-input">
                  <span className="dimension">
                    <label htmlFor="length">Length (ft)</label>
                    <input {...register('length', { required: true })} />
                  </span>
                  <span className="dimension">
                    <label htmlFor="width">Width (ft)</label>
                    <input {...register('width', { required: true })} />
                  </span>
                  <span className="dimension">
                    <label htmlFor="height">Height (ft)</label>
                    <input {...register('height')} />
                  </span>
                </div>
                <div className="create-button">
                  <input type="submit" value="Create layout" />
                </div>
              </section>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
