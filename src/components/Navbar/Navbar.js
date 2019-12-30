import React from 'react';
import classes from './Navbar.module.css';

const Navbar = props => {
  return (
    <nav className={classes.Navbar}>
      <ul className={classes.Navigation}>
        <li className={classes.col30}>
          <span className={classes.NavBrand}>Team Flerkens</span>
        </li>
        <li className={classes.col70}>
          <ul className={classes.NavLinks}>
            <li className={classes.NavLink} onClick={() => props.onLinkClicked('sign-to-speech')}>Signs to Speech</li>
            <li className={classes.NavLink} onClick={() => props.onLinkClicked('speech-to-sign')}>Speech to Signs</li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;