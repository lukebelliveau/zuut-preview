import Modal from 'react-modal';
// import './Toolbar.css';
import { PATH_APP } from 'src/routes/paths';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useRouter } from 'next/router';

if (process.env.NODE_ENV !== 'test') {
  Modal.setAppElement('#__next');
}

const ResetPlaygroundModal = ({
  open,
  onClose,
  title,
  subheader,
}: {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  subheader?: React.ReactNode;
  actions?: React.ReactNode;
}) => {
  const link = PATH_APP.playground;
  const router = useRouter();

  const resetPlayground = () => {
    onClose();
    router.push(link);
  };
  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle>
        <h2>Reset Playground?</h2>
      </DialogTitle>
      <DialogContent>
        <p>Resetting will cause your current playground to be gone forever.</p>
        <p>Are you sure you want to reset your playground?</p>
      </DialogContent>
      <DialogActions>
        {
          <>
            <Button color="warning" onClick={resetPlayground}>
              Reset playground
            </Button>
            <Button onClick={onClose}>Close</Button>
          </>
        }
      </DialogActions>
    </Dialog>
  );
};

export default ResetPlaygroundModal;
