import { homePath } from '../../Home';
import './CloseButton.css';
import Link from '../../../components/Link';

import CloseButtonIcon from '../../../images/close_button.svg';

export default function CloseButton() {
  return <Link id="close-button" to={homePath()}>
    <img alt="Close button" src={CloseButtonIcon} />
  </Link>;
}