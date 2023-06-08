import  Button  from '@mui/material/Button';
import  Modal  from '@mui/material/Modal';
import  Box  from '@mui/material/Box';

import classes from './LoginModal.module.css';
import Login from './Login';


const LoginModal = ({ open, onClose }) => {

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className={classes.Box}>
        <Login />
        <Button onClick={onClose} className={classes.CloseBtn}>Close</Button>
      </Box>
    </Modal>
  );
};

export default LoginModal;