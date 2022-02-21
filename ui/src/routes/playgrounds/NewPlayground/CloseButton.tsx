import { Link } from 'react-router-dom';
import { homePath } from '../../Home';

import CloseButtonIcon from '../../../images/close_button.svg';
import './CloseButton.css';

export default function CloseButton() {
  return <Link id="close-button" to={homePath()}>
    <img alt="Close button" src={CloseButtonIcon} />
  </Link>;
}