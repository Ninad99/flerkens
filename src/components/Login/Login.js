import React, { useState, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from '../../firebase/config';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import classes from './Login.module.css';

const isValid = (email, passwd) => {
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  const validEmail = emailRegex.test(email);
  const validPasswd = passwd.length >= 6;
  return validEmail && validPasswd;
}

const Login = props => {
  const { history, setFormDisplay } = props;
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [formError, setFormError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSignIn = useCallback(async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      setIsLoading(false);
      history.push('/');
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  }, [history]);

  const formSubmit = useCallback((event) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);
    const { email, password } = event.target.elements;
    if (isValid(email.value, password.value)) {
      handleSignIn(email.value, password.value);
      setFormError(false);
    } else {
      setFormError(true);
      setIsLoading(false);
    }
  }, [handleSignIn]);

  return (
    <section className={classes.login}>
      <Container>
        <Row className="py-2">
          <Col md={12} className="my-2 p-2 d-flex justify-content-center align-items-center">
            <Card className={classes.loginCard} body>
              <h2>Login</h2>
              <Form onSubmit={formSubmit}>
                {formError && <Alert variant="danger">Invalid email or password!</Alert>}
                {error && <Alert variant="danger">{error.message}</Alert>}
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder="Enter email" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name="password"
                    type={hiddenPassword ? "password" : "text"}
                    placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Show Password" onChange={event => setHiddenPassword(!hiddenPassword)} />
                </Form.Group>
                <Button className={classes.loginButton} variant="primary" type="submit">
                  Login&nbsp;&nbsp;
                  {isLoading && <Spinner animation="grow" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>}
                </Button>
                <div className="mt-3">
                  <span className={classes.mockLink} onClick={e => setFormDisplay('register')}>Create an account</span>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default withRouter(Login);