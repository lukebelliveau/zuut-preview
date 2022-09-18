import Modal from 'react-modal';
import { isDemoMode } from '../../../redux/store';
import { Link } from 'react-router-dom';
// import './Toolbar.css';
import { PATH_PLAYGROUND } from 'src/routes/paths';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

if (process.env.NODE_ENV !== 'test') {
  Modal.setAppElement('#root');
}

const ResetPlaygroundModal = ({ open, closeModal }: { open: boolean; closeModal: () => void }) => {
  const link = isDemoMode() ? PATH_PLAYGROUND.general.newDemo : PATH_PLAYGROUND.general.reset;

  return (
    <Modal
      isOpen={open}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="reset-playground-modal">
        <p>Resetting will cause your current playground to be gone forever.</p>
        <p>Are you sure you want to reset your playground?</p>
        <div>
          <Link to={link}>
            <button className="warning">Reset playground</button>
          </Link>
          <button onClick={closeModal}>Close</button>
        </div>
      </div>
    </Modal>
  );
};

export default ResetPlaygroundModal;
