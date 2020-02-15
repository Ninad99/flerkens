import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import Login from '../Login/Login';
import Register from '../Register/Register';

const Home = (props) => {
  const { currentUser } = useContext(AuthContext);
  const [formDisplay, setFormDisplay] = useState('login');

  return (
    <>
    {currentUser ? <h2>Logged in</h2> : (
      <>
        {formDisplay === 'login' ? <Login setFormDisplay={setFormDisplay} /> : <Register setFormDisplay={setFormDisplay} />}
      </>
    )}
    </>
  );
}

export default Home;