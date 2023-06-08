import Snackbar from '@mui/material/Snackbar';
import classes from './Snackbar.module.css';
import Alert from '@mui/material/Alert';

function SnackbarUi({ open, message, onClose }) {

    const handleClose = () => {
        onClose();
    };

    return (
        <div>
            <Snackbar open={open} onClose={handleClose} autoHideDuration={3000}>
                <Alert onClose={handleClose} severity="success" className={classes.Alert}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default SnackbarUi;

