import React, { useState, useRef, useEffect } from "react";
import Webcam from './Webcam/Webcam';
import classes from "./SignToSpeech.module.css";

const SignToSpeech = props => {
  const [predictedAlphabet, setPredictedAlphabet] = useState(null);
  const [generatedString, setGeneratedString] = useState('');
  const stringMaker = useRef();

  useEffect(() => {
    console.log('useEffect [SignToSpeech.jsx]');
    return () => {
      return;
    }
  }, []);

  const stringAdder = () => {
    if (predictedAlphabet) {
      setGeneratedString(generatedString + predictedAlphabet);
    }
  };

  const makeItSpeak = () => {
    if (generatedString) {
      var msg = new SpeechSynthesisUtterance(generatedString);
      window.speechSynthesis.speak(msg);
    }
  };

  const makeTheSpeechStop = () => {
    window.speechSynthesis.cancel();
  };

  return (
    <section className={classes.SignToSpeech}>
      <div>Add Some animations to cover the blind loading time</div>
      <Webcam setPredictedAlphabet={setPredictedAlphabet} />
      <h2>{predictedAlphabet}</h2>
      <p>{generatedString}</p>
      <button
        className={classes.navLink}
        onClick={stringAdder}
      >
        Add To string
      </button>
      <button
        className={classes.navLink}
        ref={stringMaker}
        onClick={makeItSpeak}
      >
        Speak
      </button>
      <button
        className={classes.navLink}
        ref={stringMaker}
        onClick={makeTheSpeechStop}
      >
        Stop
      </button>
    </section>
  );
};

export default SignToSpeech;

