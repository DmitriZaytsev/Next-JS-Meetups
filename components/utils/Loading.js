import LinearProgress from '@mui/material/LinearProgress';

import classes from './Loading.module.css';

function Loading() {

    return (
        <div className={classes.page__loading}>
            <div className={classes.text}>Loading...</div>
            <LinearProgress color="inherit" className={classes.linear}/>
        </div>
    );
}

export default Loading;