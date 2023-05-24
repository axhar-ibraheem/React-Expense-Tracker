import React, { useRef, useState, useContext } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Spinner,
  Toast,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Context from "../store/context";

const Auth = () => {
  const [signIn, setSignIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const ctx = useContext(Context);
  const history = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const onClickHandler = () => {
    setSignIn(!signIn);
  };

  const content = (
    <Spinner animation="border" role="status" variant="dark">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const enteredEmail = emailRef.current.value;
      const enteredPassword = passwordRef.current.value;
      let enteredConfirmPassword;

      if (!signIn) {
        enteredConfirmPassword = confirmPasswordRef.current.value;
        if (enteredConfirmPassword !== enteredPassword) {
          throw new Error("Passwords don't match");
        }
      }

      const endPointUrl = signIn
        ? `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${ctx.apiKey}`
        : `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${ctx.apiKey}`;

      const response = await fetch(endPointUrl, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        console.log("user has sucessfully signed Up");
        if (signIn) {
          console.log(data.idToken);
          ctx.login(data.idToken);
          history.replace("/welcome");
        } else {
          setSignIn(true);
        }
      } else {
        const errorMessage = data.error.message;
        throw new Error(errorMessage);
      }
    } catch (e) {
      setErrorMessage(e.message);
      setShow(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="">
      <Row className="justify-content-center mt-5 ">
        <Col className="mt-5 mb-5 px-3" md={5}>
          <Form onSubmit={onSubmitHandler} className="pb-5 px-4 shadow ">
            <div className="text-center py-3">
              <h3 className="fw-bold text-success">
                {signIn ? "Login" : "Sign Up"}
              </h3>
            </div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fw-bold">Email address</Form.Label>
              <Form.Control
                ref={emailRef}
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="fw-bold">Password</Form.Label>
              <Form.Control
                ref={passwordRef}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            {!signIn && (
              <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                <Form.Label className="fw-bold">Confirm Password</Form.Label>
                <Form.Control
                  ref={confirmPasswordRef}
                  type="password"
                  placeholder="Confirm Password"
                />
              </Form.Group>
            )}
            {signIn ? (
              <Button className="w-100" variant="success" type="submit">
                {isLoading ? content : "Login"}
              </Button>
            ) : (
              <Button className="w-100" variant="success" type="submit">
                {isLoading ? content : "Sign Up"}
              </Button>
            )}
            {show && (
              <Toast
                className="w-100 mt-3 bg-danger"
                onClose={() => setShow(false)}
                delay={4000}
                autohide
              >
                <Toast.Header className="d-flex fw-bold justify-content-between">
                  !!
                </Toast.Header>
                <Toast.Body className="fw-bold">{errorMessage}</Toast.Body>
              </Toast>
            )}
          </Form>

          {
            <div className="text-center mt-3">
              <Button variant="dark" onClick={onClickHandler} className="">
                {signIn ? "First Time, then Sign Up" : "Have an Account? Login"}
              </Button>
            </div>
          }
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;
