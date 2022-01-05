import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './NewPlayground.css';

import Layout from '../../components/Layout';
import { create } from '../../features/playgroundPlan/playgroundPlanSlice';
import { playground_path } from './ShowPlayground';
import Plan from '../../lib/plan';
import { planStateBuilder } from '../../features/playgroundPlan/playgourndPlanReduxAdapter';

export const new_playground_path = () => '/playgrounds/new';

export type CreatePlanParams = {
  name: string;
  // width: number;
  // length: number;
}

function formDataAdapter(params: CreatePlanParams): Plan {
  return new Plan(params.name, 1, 1);
}

export default function NewPlayground() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<CreatePlanParams>();
  const dispatch = useDispatch();
  const onSubmit: SubmitHandler<CreatePlanParams> = data => {
    const plan = formDataAdapter(data);
    dispatch(create(planStateBuilder(plan)));
    navigate(playground_path());
  };

  return (
    <Layout header="Playground">
      <div id="sandbox">
        <section id="new-playground">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field-name">
              <label htmlFor="name">Grow Plan Name:</label>
            </div>
            <div className="field-name-input">
              <input placeholder="Give the grow plan a name" 
                {...register('name', { required: true })} />
            </div>
            <div className="create-button">
              <input type="submit" value="Create layout" />
            </div>
          </form>
        </section>
      </div>
    </Layout>
  );
}
