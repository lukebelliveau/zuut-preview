import DownArrow from '../../../images/down-arrow.svg';
import './NextButton.css';

type NextButtonProps = {
  nextPage: () => void;
}

export default function NextButton(props: NextButtonProps) {
  return <button className="nextButton" onClick={props.nextPage}>
    <img alt="Down arrow" src={DownArrow} aria-hidden="true" />
    <p>scroll to continue</p>
  </button>;
}