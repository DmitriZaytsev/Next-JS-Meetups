import { useStytchSession } from '@stytch/nextjs';
import Link from 'next/link';

import { useAlert, useLoginModal } from '../../lib/alert-modal-handler';
import LoginModal from '../auth/LoginModal';
import classes from './Footer.module.css';
import Alert from '../utils/Alert.js';

function Footer() {
   const [isAlertOpen, handleOpenAlert, handleCloseAlert, handleAgreeLogout] = useAlert();
   const [isLoginModalShown, handleOpenLogin, handleCloseLogin] = useLoginModal();
   const { session } = useStytchSession();

   //controll Alert for Logout Confirmation
   const handleAgree = () => {
      handleAgreeLogout();
   };

   //open login/logout modal 
   const handleOpenModal = () => {
      if (session) handleOpenAlert();
      else handleOpenLogin();
   };

   return (
      <footer className={classes.footer}>
         <div className={classes.flexcontainer}>
            <nav className={`${classes.nav} ${classes.nav__1}`}>
               <p className={classes.nav__title}>Accont</p>
               {session ? (
                  <button onClick={handleOpenModal}>
                     Logout
                  </button>
               ) : (
                  <>
                     <button onClick={handleOpenModal}>
                        Login
                     </button>
                     <button onClick={handleOpenModal}>
                        Sign up
                     </button>
                  </>
               )}
            </nav>
            <nav className={`${classes.nav} ${classes.nav__2}`}>
               <p className={classes.nav__title}>Info</p>
               <Link href='/'>News</Link>
               <Link href='/'>Help center</Link>
               <Link href='/'>Privacy & tepms</Link>
            </nav>
            <nav className={`${classes.nav} ${classes.nav__3}`}>
               <p className={classes.nav__title}>Company</p>
               <Link href='/'>Our team</Link>
               <Link href='/'>Partners</Link>
               <Link href='/'>About project</Link>
            </nav>
         </div>
         <p className={classes.copyright}><span>&#169;Coded by Dmitry Zaitsev</span></p>
         <Alert open={isAlertOpen} question={`Do you really want to logout?`} message={''} onClose={handleCloseAlert} onAgree={handleAgree} />
         <LoginModal open={isLoginModalShown} onClose={handleCloseLogin} />
      </footer>
   );
}

export default Footer;
