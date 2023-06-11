import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

import classes from './Alert.module.css'

function AlertDialog({ open, onClose, question, message, onAgree }) {

    const handleClose = () => {
        onClose();
    };

    const handleAgree = () => {
        onAgree();
        onClose();
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {question}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" className={classes.questionAlert}>
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} className={classes.btnAlert}>Disagree</Button>
                    <Button onClick={handleAgree} autoFocus className={classes.btnAlert}>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AlertDialog;