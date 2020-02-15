import React, { useRef, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as mobilenetModule from '@tensorflow-models/mobilenet';
import * as knnClassifier from '@tensorflow-models/knn-classifier';
import classes from './CustomSigns.module.css';

// Create the classifier.
const classifier = knnClassifier.create();

const CustomSigns = async props => {
  const webcamElement = useRef();
  
  useEffect(() => {
    let net;
    async function app() {
      console.log('Loading mobilenet..');
      
      // Load the model.
      net = await mobilenetModule.load();
      console.log('Successfully loaded model');
      
      // Create an object from Tensorflow.js data API which could capture image from the web camera as Tensor.
      const webcam = await tf.data.webcam(webcamElement.current);
      
      // Reads an image from the webcam and associates it with a specific class index.
      const addExample = async classId => {
        // Capture an image from the web camera.
        const img = await webcam.capture();
        
        // Get the intermediate activation of MobileNet 'conv_preds' and pass that to the KNN classifier.
        const activation = net.infer(img, 'conv_preds');
        
        // Pass the intermediate activation to the classifier.
        classifier.addExample(activation, classId);
        console.log(classifier.getClassifierDataset());
        
        // Dispose the tensor to release the memory.
        img.dispose();
      };
      let classes = [];
      // When clicking a button, add an example for that class.
      for(let i = 0; i < document.getElementById("hello").childElementCount; i++){  
        document.getElementById(`class-${i}`).addEventListener('click', () => addExample(i));
      }
      
      while (true) {
        console.log(classifier.getNumClasses());
        if (classifier.getNumClasses() > 0) {
          const img = await webcam.capture();
          
          // Get the activation from mobilenet from the webcam.
          const activation = net.infer(img, 'conv_preds');
          // Get the most likely class and confidence from the classifier module.
          const result = await classifier.predictClass(activation);
          console.log(result);
          classes = ['Good', 'Bad', 'Left', 'Right']
          document.getElementById('console').innerText = `
          prediction: ${classes[result.label]}\n
          probability: ${result.confidences[result.label]}
          `;
          
          // Dispose the tensor to release the memory.
          img.dispose();
        }
        
        await tf.nextFrame();
      }
    }
    app();
  }, []);

  return (
    <section className={classes.customSigns}>
      <div id="console"></div>
      <video autoplay playsinline muted id="webcam" width="224" height="224"></video>
    </section>
  );
}

export default CustomSigns;