import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import SpeechToSign from './components/SpeechToSign/SpeechToSign';
import SignToSpeech from './components/SignToSpeech/SignToSpeech';
import CustomSigns from './components/CustomSigns/CustomSigns';
import PrivateRoute from './hoc/PrivateRoute';

import classes from './App.module.css';

const App = (props) => {
  return ( 
    <div className = {classes.App}>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} /> 
        <PrivateRoute path="/speech-to-sign" exact component={SpeechToSign} />
        <PrivateRoute path="/sign-to-speech" exact component={SignToSpeech} />
        <PrivateRoute path="/custom-signs" exact component={CustomSigns} />
      </Switch>
    </div>
  );
}

export default App;