import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Navbar.module.css';

const Navbar = (props) => {
  return (
    <nav className={classes.Navbar}>
      <ul className={classes.Navigation}>
        <li className={classes.col30}>
          <span className={classes.NavBrand}>Team Flerkens</span>
        </li>
        <li className={classes.col70}>
          <ul className={classes.NavLinks}>
            <li>
              <Link className={classes.NavLink} to="/sign-to-speech">Signs to Speech</Link>
            </li>
            <li>
              <Link className={classes.NavLink} to="/speech-to-sign">Speech to Signs</Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;