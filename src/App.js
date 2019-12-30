import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import SpeechToSign from './components/SpeechToSign/SpeechToSign';
import SignToSpeech from './components/SignToSpeech/SignToSpeech';

import classes from './App.module.css';

const App = (props) => {
  const [display, setDisplay] = useState('sign-to-speech');

  const handleLinkClick = (linkName) => setDisplay(linkName);

  let currentDisplay = <SignToSpeech />

  if (display === 'speech-to-sign') {
    currentDisplay = <SpeechToSign />
  }

  return (
    <div className={classes.App}>
      <Navbar onLinkClicked={handleLinkClick} />
      <main className={classes.mainContent}>
        {currentDisplay}
      </main>
    </div>
  );
}

export default App;
