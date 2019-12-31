import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import SpeechToSign from './components/SpeechToSign/SpeechToSign';
import SignToSpeech from './components/SignToSpeech/SignToSpeech';

import classes from './App.module.css';

const App = (props) => {
  return (
    <div className={classes.App}>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/speech-to-sign" component={SpeechToSign} />
        <Route path="/sign-to-speech" component={SignToSpeech} />
      </Switch>
    </div>
  );
}

export default App;
