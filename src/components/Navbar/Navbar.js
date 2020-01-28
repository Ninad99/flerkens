import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {
  Link
} from 'react-router-dom';
import classes from './Navbar.module.css';

const exportedNavbar = (props) => {
  return ( 
  <Navbar bg = "dark" variant = "dark" expand = "lg" sticky = "top" >
    <Navbar.Brand > < Link to = "/" > Team Flerkens </Link> </Navbar.Brand >
    <Navbar.Toggle aria-controls = "basic-navbar-nav"/>
    <Navbar.Collapse id = "basic-navbar-nav" >
    <Nav className = "ml-auto">
    <span className = {classes.navLink} >
    <Link to = "/sign-to-speech"className = {classes.whiteText} > Signs to Speech </Link> </span> <span className = {classes.navLink} >
    <Link to = "/speech-to-sign"className = {classes.whiteText} > Speech to Signs </Link> </span> </Nav> </Navbar.Collapse > </Navbar>
  );
}

export default exportedNavbar;