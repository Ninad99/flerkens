import React, { useState, useRef } from 'react';
// import * as tf from '@tensorflow/tfjs';
import * as tmImage from '@teachablemachine/image';

import classes from './SignToSpeech.module.css';

const SignToSpeech = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const imgModel = useRef();
  const imgWeights = useRef();
  const imgMetadata = useRef();
  const webcamContainer = useRef();
  const labelContainer = useRef();

  let model, webcam, maxPredictions, predictions;
  
  const init = async function () {
    setIsLoading(true);
    const uploadModel = imgModel.current.files[0];
    const uploadWeights = imgWeights.current.files[0];
    const uploadMetadata = imgMetadata.current.files[0];
    model = await tmImage.loadFromFiles(uploadModel, uploadWeights, uploadMetadata);
    maxPredictions = model.getTotalClasses();

    webcam = new tmImage.Webcam(300, 300, true);
    await webcam.setup();
    await webcam.play();
    window.requestAnimationFrame(loop);

    webcamContainer.current.appendChild(webcam.canvas);
    setIsLoading(false);
    for (let i = 0; i < maxPredictions; i++) { // and class labels
      labelContainer.current.appendChild(document.createElement("div"));
    }
  }

  const loop = async function () {
    webcam.update();
    await predict();
    window.requestAnimationFrame(loop);
  }

  const predict = async function () {
    predictions = await model.predict(webcam.canvas);
    for (let i = 0; i < maxPredictions; i++) {
      const classPrediction = predictions[i].className + ": " + predictions[i].probability.toFixed(2);
      labelContainer.current.childNodes[i].innerHTML = classPrediction;
    }
  }

  return (
    <section className={classes.SignToSpeech}>
      <h1>Signs To Speech</h1>
      <div className={classes.fileInputs}>
        <div className={classes.flexCol}>
          <input className={classes.fileInput} 
                type="file"
                name="upload-model"
                id="upload-model"
                ref={imgModel} />
          <label htmlFor="upload-model">Enter the model.json file</label>
        </div>
        <div className={classes.flexCol}>
          <input className={classes.fileInput} 
                type="file"
                name="upload-weights"
                id="upload-weights"
                ref={imgWeights} />
          <label htmlFor="upload-weights">Enter the weights.bin file</label>
        </div>
        <div className={classes.flexCol}>
          <input className={classes.fileInput} 
                type="file"
                name="upload-metadata"
                id="upload-metadata"
                ref={imgMetadata} />
          <label htmlFor="upload-metadata">Enter the metadata.json file</label>
        </div>
      </div>
      <button className={classes.startButton} type="button" onClick={init}>Start</button>
      {isLoading ? <span>Loading...</span> : null}
      <div className={classes.webcamContainer} ref={webcamContainer}></div>
      <div className={classes.labelContainer} ref={labelContainer}></div>
    </section>
  );
}

export default SignToSpeech;