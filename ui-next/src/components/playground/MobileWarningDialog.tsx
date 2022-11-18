import Modal from 'react-modal';

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';

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
  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle>
        <h2>Mobile Device Detected</h2>
      </DialogTitle>
      <DialogContent>
        <Typography>
          Hey there! It seems like you're on a mobile device.
        </Typography>
        <br />
        <Typography>
          Feel free to click around, but please know that the ZUUT Playground is
          best experienced on a desktop (or even a tablet!)
        </Typography>
        <br />
        <Typography>Thanks so much for trying ZUUT!</Typography>
        <Button onClick={onClose} sx={{ width: '100%' }}>
          OK
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ResetPlaygroundModal;
