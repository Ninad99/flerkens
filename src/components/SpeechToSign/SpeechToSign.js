import React, { useState, useCallback } from 'react';
import { storage } from '../firebase/config';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophoneAlt, faMicrophoneAltSlash } from '@fortawesome/free-solid-svg-icons';
import classes from './SpeechToSign.module.css';

const add = async (alphabet) => {
  const regex = /^[a-zA-Z0-9]$/;
  if (alphabet === ' ' || !regex.test(alphabet)) {
    console.log('invalid character')
    return null;
  }
  const inputAlpha = alphabet.toLowerCase();
  const storageRef = await storage.ref(`signs/${inputAlpha}.jpg`);

  let url = null;
  try {
    url = await storageRef.getDownloadURL();
  } catch (err) {
    console.log(err);
  }
  return url;
}

const SpeechToSign = (props) => {
  const [outputImages, setOutputImages] = useState([]);
  const [textInput, setTextInput] = useState('');
  const [showImages, setShowImages] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = useCallback(async () => {
    setIsLoading(true);
    const images = [];
    for (let char of textInput) {
      const imgURL = await add(char);
      images.push(imgURL);
    }
    console.log(images);
    setOutputImages(images);
    setShowImages(true);
    setIsLoading(false);
  }, [setShowImages, setOutputImages, textInput]);


  return (
    <div className="bg-dark text-light d-flex flex-column justify-content-center align-items-center">
      <h1>Welcome to Speech to Sign!</h1>
      <h3>Here you can comunicate with the deaf and dumbs with our translator.</h3>
      <div className={classes.inputContainer}>
        <Form.Control
          type="text"
          placeholder="Enter text here or Click on the Mic button"
          value={textInput}
          onChange={event => setTextInput(event.target.value)} />
      </div>
      <div className="my-3 d-flex justify-content-around align-items-center">
        <Button variant="primary" className="mr-2" onClick={handleInput}>Convert</Button>
        <Button variant="primary" onClick={event => setTextInput('')}>Refresh</Button>
      </div>
      <div className="d-flex justify-content-around align-items-center">
        <span className="mr-2"><FontAwesomeIcon className={classes.micOn} icon={faMicrophoneAlt} size="2x" /></span>
        <span><FontAwesomeIcon className={classes.micOff} icon={faMicrophoneAltSlash} size="2x" /></span>
      </div>
      {isLoading ? <Spinner animation="grow" variant="primary" /> : <p>You'll get your results here..</p>}
      <div className={classes.outputContainer}>
        {showImages ? outputImages.map((imgURL, index) => {
          if (imgURL) {
            return <img key={index} src={imgURL} style={{ width: '200px', height: '200px' }} alt="output img" />
          } else {
            return <br key={index} />
          }
        }) : null}
      </div>
    </div>
  );
}

export default SpeechToSign;