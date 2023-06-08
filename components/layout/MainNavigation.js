import ClickAwayListener from '@mui/material/ClickAwayListener';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Button from '@mui/material/Button';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import Grow from '@mui/material/Grow';


import { useState, useEffect, useRef } from 'react';
import { useStytchSession } from '@stytch/nextjs';
import { useRouter } from 'next/router';
import Link from 'next/link';

import classes from './MainNavigation.module.css';
import LoginModal from '../auth/LoginModal';
import Alert from '../utils/Alert.js';

import { useAlert, useLoginModal } from '../../lib/alert-modal-handler';


function MainNavigation() {
  const [isAlertOpen, handleOpenAlert, handleCloseAlert, handleAgreeLogout] = useAlert();
  const [isLoginModalShown, handleOpenLogin, handleCloseLogin] = useLoginModal();

  const [isMenuOpen, setMenuOpen] = useState(false);
  const { session } = useStytchSession();
  const prevMenuOpenRef = useRef(isMenuOpen);
  const anchorRef = useRef(null);
  const router = useRouter();

  //variables for checking session and routh path
  const isSession = session || session?.authentication_factors.length > 2;
  const routhPath = router.pathname;

  //get mail
  const mail = session?.authentication_factors[0].email_factor.email_address;

  //controll Menu List 
  const handleToggleMenu = () => {
    setMenuOpen(prevMenuOpen => !prevMenuOpen);
  };

  //close menu if clicked outside menu
  const handleCloseMenu = (e) => {
    if (anchorRef.current && anchorRef.current.contains(e.target)) {
      return;
    }

    setMenuOpen(prevMenuOpen => !prevMenuOpen);
  };

  const handleEscMenu = (e) => {
    if (e.key === 'Escape') {
      setMenuOpen(prevMenuOpen => prevMenuOpen = false);
    }
  };

  //make focus on menu button after closing menu
  useEffect(() => {
    if (prevMenuOpenRef.current === true && isMenuOpen === false) {
      anchorRef.current.focus();
    }

    prevMenuOpenRef.current = isMenuOpen;
  }, [isMenuOpen]);

  //controll Alert for Logout Confirmation
  const handleAgree = () => {
    handleAgreeLogout();
  };

  //open login/logout modal and close menu
  const handleItemClick = (e) => {
    handleCloseMenu(e);
    if (isSession) handleOpenAlert();
    else handleOpenLogin();
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>NextJS Meetups</div>
      <nav className={`${classes.nav__meetups} ${isSession ? classes.justify__center : ''}`}>
        <ul>
          <li>
            <Link href='/' className={`${routhPath === '/' ? classes.active : ''}`}>All Meetups</Link>
          </li>
          <li>
            <Link href='/new-meetup' className={`${routhPath === '/new-meetup' ? classes.active : ''}`}>Add New Meetup</Link>
          </li>
        </ul>
      </nav>
      <div className={classes.menu}>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={isMenuOpen ? 'composition-menu' : undefined}
          aria-expanded={isMenuOpen ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggleMenu}
          className={classes.menuBtn}
        >
          {isSession ? mail : 'Menu'}
          {isMenuOpen ? <ExpandLess /> : <ExpandMore />}
        </Button>
        <Popper
          open={isMenuOpen}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseMenu}>
                  <MenuList
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleEscMenu}
                    className={classes.menuDropdownList}
                    autoFocusItem={isMenuOpen}
                  >
                    <MenuItem component="button" onClick={handleItemClick}>
                      {isSession ? 'Logout' : 'Login'}
                    </MenuItem>
                    <MenuItem component="a" href="/" onClick={handleCloseMenu}>
                      Our team
                    </MenuItem>
                    <MenuItem component="a" href="/" onClick={handleCloseMenu}>
                      Partners
                    </MenuItem>
                    <MenuItem component="a" href="/" onClick={handleCloseMenu}>
                      About project
                    </MenuItem>
                    <MenuItem component="a" href="/" onClick={handleCloseMenu}>
                      News
                    </MenuItem>
                    <MenuItem component="a" href="/" onClick={handleCloseMenu}>
                      Help center
                    </MenuItem>
                    <MenuItem component="a" href="/" onClick={handleCloseMenu}>
                      Privacy & terms
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
      <Alert open={isAlertOpen} question={`Do you really want to logout?`} message={''} onClose={handleCloseAlert} onAgree={handleAgree} />
      <LoginModal open={isLoginModalShown} onClose={handleCloseLogin} />
    </header >
  );
}

export default MainNavigation;



