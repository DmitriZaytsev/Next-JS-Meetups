import { useStytch, useStytchSession } from '@stytch/nextjs';
import { useState } from 'react';

import classes from './Login.module.css';

const Login = () => {
    const [emailAttempts, setEmailAttempts] = useState(JSON.parse(localStorage.getItem('emailAttempts')) || {});
    const [approveForm, setApproveForm] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { session } = useStytchSession();
    const stytchClient = useStytch();

    const sendEmailMagicLink = (email) => {
        stytchClient.magicLinks.email.loginOrCreate(email, {
            login_magic_link_url: `http://localhost:3000/authenticate`,
            login_expiration_minutes: 10,
            signup_magic_link_url: `http://localhost:3000/authenticate`,
            signup_expiration_minutes: 10,
        });
    };
    //validation to prevent too many requests to the same email
    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        const isValidEmail = emailRegex.test(email);

        if (session) {

            setEmailAttempts(prevAttempts => prevAttempts = {});

            localStorage.removeItem('emailAttempts');

            setErrorMessage('You are already logged in.');

        } else if (emailAttempts[email] >= 3) {

            setErrorMessage('You entered the email three times.\n Please follow the link to log in.\n Or come back after 24 hours');

            //clear localStorage after 24 hours
            setTimeout(() => {
                localStorage.removeItem('emailAttempts');
            }, 24 * 60 * 60 * 1000);

        } else if (isValidEmail) {

            setEmailAttempts(prevAttempts => {
                const updatedAttempts = {
                    ...prevAttempts,
                    [email]: (prevAttempts[email] || 0) + 1,
                };

                localStorage.setItem('emailAttempts', JSON.stringify(updatedAttempts));
            });

            sendEmailMagicLink(email);

            setApproveForm(prevForm => !prevForm);

        } else {
            setErrorMessage('Incorrect format of email.\n Example: example@gmail.com');
        }
    };

    return (
        <form onSubmit={handleSubmit} noValidate>
            {approveForm ? (
                <span>Great! Check your email.</span>
            ) : (
                <>
                    <input type="email" name="email" className={classes.input__mail}/>
                    <button type="submit" className={classes.submit}>Submit</button>
                    {errorMessage && <p className={classes.error}>{errorMessage}</p>}
                </>
            )}
        </form>
    );
};

export default Login;




