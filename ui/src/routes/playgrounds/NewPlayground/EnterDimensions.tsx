import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import LayoutIcon from '../../../images/glyphs/layout.svg';
import './EnterDimensions.css';

import PillInput from '../../../components/PillInput';
import { playground_path } from '../ShowPlayground';
import Section from './Section';
import { feetToMm } from '../../../lib/conversions';
import { setDimentions } from '../../../features/plans/planSlice';
import { useDispatch } from 'react-redux';

type CreateLayoutFormParams = {
  width: number;
  length: number;
};

export default function EnterDimensions() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<CreateLayoutFormParams>();

  const onSubmit: SubmitHandler<CreateLayoutFormParams> = (data) => {
    dispatch(setDimentions({
      width: feetToMm(data.width),
      length: feetToMm(data.length),
    }));

    navigate(playground_path());
  };

  return (
    <>
      <Section>
        <h2>Tell me about your grow area</h2>
        <div className="dimension">
          <PillInput
            name="length"
            aria-label="length"
            label="room length"
            registrationOptions={register('length', { required: true })}
            description="ft"
          />
        </div>
        <div className="dimension">
          <PillInput
            name="width"
            aria-label="width"
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
