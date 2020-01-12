import React, { useEffect, useRef } from "react";
import * as tmImage from "@teachablemachine/image";
import classes from "./SignToSpeech.module.css";

const SignToSpeech = props => {
  let model,
    webcam,
    maxPredictions,
    predictedAlphabet = null,
    generatedString = "",
    URL = "http://localhost:2000/";

  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  const stringMaker = useRef();
  const webcamContainer = useRef();
  const labelContainer = useRef();
  const displayString = useRef();

  useEffect(() => {
    init();
  }, []);

  const stringAdder = () => {
    generatedString += predictedAlphabet;
    displayString.current.childNodes[0].innerHTML = generatedString;
  };

  const makeItSpeak = () => {
    var msg = new SpeechSynthesisUtterance(generatedString);
    window.speechSynthesis.speak(msg);
  };

  const makeTheSpeechStop = () => {
    window.speechSynthesis.cancel();
  };

  const init = async () => {
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    const flip = true;
    webcam = new tmImage.Webcam(200, 200, flip);
    await webcam.setup();
    await webcam.play();
    window.requestAnimationFrame(loop);

    webcamContainer.current.appendChild(webcam.canvas);
    labelContainer.current.appendChild(document.createElement("div"));
    displayString.current.appendChild(document.createElement("div"));
  };

  const loop = async () => {
    webcam.update();
    await predict();
    window.requestAnimationFrame(loop);
  };

  const predict = async () => {
    const prediction = await model.predict(webcam.canvas);
    for (let i = 1; i < maxPredictions; i++) {
      if (prediction[i].probability > 0.8) {
        labelContainer.current.childNodes[0].innerHTML =
          prediction[i].className;
        //+ ": " + prediction[i].probability.toFixed(2);
        predictedAlphabet = prediction[i].className;
      }
    }
  };

  return (
    <section className={classes.SignToSpeech}>
      <div>Add Some animations to cover the blind loading time</div>
      <div className={classes.webcamContainer} ref={webcamContainer}></div>
      <div className={classes.labelContainer} ref={labelContainer}></div>
      <button
        className={classes.navLink}
        ref={stringMaker}
        onClick={stringAdder}
      >
        Add To string
      </button>
      <div className={classes.labelContainer} ref={displayString}></div>
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
×
Drag and Drop
The image will be downloaded
