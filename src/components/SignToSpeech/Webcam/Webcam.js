import React, { useRef, useEffect, useCallback } from "react";
// import { storage } from '../../firebase/config';
import * as tmImage from "@teachablemachine/image";
import classes from "./Webcam.module.css";

let model, webcam = null;
const modelURL = process.env.REACT_APP_MODEL_URL.slice(1, -2) + "model.json";
const metadataURL = process.env.REACT_APP_MODEL_URL.slice(1, -2) + "metadata.json";

const Webcam = props => {
  const { setPredictedAlphabet } = props;
  const webcamContainer = useRef();

  const predict = useCallback(async () => {
    try {
      const prediction = await model.predict(webcam.canvas);
      prediction.sort((a, b) => b.probability - a.probability);
      setPredictedAlphabet(prediction[0].className);
    } catch (err) {
      console.log(err);
    }
  }, [setPredictedAlphabet]);

  const loop = useCallback(async () => {
    try {
      webcam.update();
      await predict();
      window.requestAnimationFrame(loop);
    } catch (err) {
      console.log(err);
    }
  }, [predict]);

  useEffect(() => {
    console.log("useEffect [Webcam.js]");
    const init = async () => {
      try {
        model = await tmImage.load(modelURL, metadataURL);
        const flip = true;
        webcam = new tmImage.Webcam(300, 300, flip);
        await webcam.setup();
        await webcam.play();
        window.requestAnimationFrame(loop);
        webcamContainer.current.appendChild(webcam.canvas);
      } catch (err) {
        console.log(err);
      }
    };
    init();
    return async () => {
      if (webcam) {
        await webcam.stop();
      }
    };
  }, [loop]);

  return (
    <div className={classes.webcamContainer} ref={webcamContainer}>
      {" "}
    </div>
  );
};

export default Webcam;
