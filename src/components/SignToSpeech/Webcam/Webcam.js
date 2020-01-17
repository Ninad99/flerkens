import React, { useRef, useEffect, useCallback } from 'react';
import * as tmImage from "@teachablemachine/image";
import classes from './Webcam.module.css';

let model, webcam = null, maxPredictions;
const URL = "http://localhost:2000/";
const modelURL = URL + "model.json";
const metadataURL = URL + "metadata.json";

const Webcam = props => {
  const { setPredictedAlphabet } = props;
  const webcamContainer = useRef();
  
  const predict = useCallback(async () => {
    try {
      const prediction = await model.predict(webcam.canvas);
      for (let i = 1; i < maxPredictions; i++) {
        if (+prediction[i].probability > 0.8) {
          setPredictedAlphabet(prediction[i].className);
        }
      }
    } catch(err) {
      console.log(err);
    }
  }, [setPredictedAlphabet]);

  const loop = useCallback(async () => {
    try {
      webcam.update();
      await predict();
      window.requestAnimationFrame(loop);
    } catch(err) {
      console.log(err);
    }
  }, [predict]);

  useEffect(() => {
    console.log('useEffect [Webcam.js]');
    const init = async () => {
      try {
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
      
        const flip = true;
        webcam = new tmImage.Webcam(200, 200, flip);
        await webcam.setup();
        await webcam.play();
        window.requestAnimationFrame(loop);
        webcamContainer.current.appendChild(webcam.canvas);
      } catch(err) {
        console.log(err);
      }
    };
    init();
    return async () => {
      console.log('useEffect returned');
      await webcam.stop();
      // window.cancelAnimationFrame(loop);
    }
  }, [loop]);

  return (
    <div className={classes.webcamContainer} ref={webcamContainer}></div>
  );
}

export default Webcam;