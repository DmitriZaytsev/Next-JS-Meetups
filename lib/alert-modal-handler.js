import { useState, useCallback } from 'react';
import { useStytch } from '@stytch/nextjs';


//controll Login Modal
export function useLoginModal() {
    const [isLoginModalShown, setLoginModalShown] = useState(false);

    const handleOpenLogin = () => {
        setLoginModalShown(prevLoginOpen => !prevLoginOpen);
    };

    const handleCloseLogin = () => {
        setLoginModalShown(prevLoginOpen => !prevLoginOpen);
    };

    return [isLoginModalShown, handleOpenLogin, handleCloseLogin];
}

//controll Alert for Logout Confirmation
export function useAlert() {
    const [isAlertOpen, setAlertOpen] = useState(false);
    const stytchClient = useStytch();

    const handleOpenAlert = () => {
        setAlertOpen(prevOpenAlert => !prevOpenAlert);
    };

    const handleCloseAlert = () => {
        setAlertOpen(prevOpenAlert => !prevOpenAlert);
    };

    const handleAgreeLogout = useCallback(() => {
        try {
            stytchClient.session.revoke();
        } catch (err) {
            console.error(err);
        }
    }, [stytchClient]);

    return [isAlertOpen, handleOpenAlert, handleCloseAlert, handleAgreeLogout];
}

