import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { handleLogout } from '../../firebase/utility';
import classes from './Navbar.module.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const ExportedNavbar = props => {
  const { currentUser } = useContext(AuthContext);
  const { history } = props;

  const signOut = () => {
    handleLogout()
      .then(() => {
        history.push('/');
      })
  }

  return ( 
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Navbar.Brand><Link to="/">Team Flerkens</Link></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">
        {currentUser ? (
          <Nav className="ml-auto">
            <div className={classes.navLink}>
              <Link to="/sign-to-speech" className={classes.whiteText}> Signs to Speech </Link>
            </div>
            <div className={classes.navLink}>
              <Link to="/speech-to-sign" className={classes.whiteText}> Speech to Signs </Link>
            </div>
            <div className={classes.navLink}>
              <Link to="/custom-signs" className={classes.whiteText}> Custom Signs </Link>
            </div>
            <div className={classes.navLink} onClick={signOut}>
              <span className={classes.whiteText}>Logout</span>
            </div>
          </Nav>
        ) : null}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default withRouter(ExportedNavbar);