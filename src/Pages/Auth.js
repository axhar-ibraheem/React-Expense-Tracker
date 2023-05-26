import React, { useRef, useState, useContext } from "react";
import { Form, Button, Container, Spinner, Toast, Card } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import Context from "../store/context";
import LoadingSpinner from "../Components/LoadingSpinner";
import ErrorMessage from "../Components/ErrorMessage";
import axios from "axios";

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
          setErrorMessage("Passwords don't match");
          setShow(true);
          return;
        }
      }

      const endPointUrl = signIn
        ? `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${ctx.apiKey}`
        : `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${ctx.apiKey}`;

      const response = await axios.post(
        endPointUrl,
        {
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      console.log(response.data);
      if (response.status === 200) {
        if (signIn) {
          ctx.login(data.idToken, data.email);
          history.replace("/welcome");
        } else {
          setSignIn(true);
        }
      }
    } catch (error) {
      setErrorMessage(error.response.data.error.message);
      setShow(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container
      className=" d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <Card style={{ maxWidth: "32rem" }} className=" border-0 w-100">
        <Form onSubmit={onSubmitHandler} className="pb-4 shadow px-4">
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
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="fw-bold">Password</Form.Label>
            <Form.Control
              ref={passwordRef}
              type="password"
              placeholder="Password"
              required
            />
          </Form.Group>
          {!signIn && (
            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
              <Form.Label className="fw-bold">Confirm Password</Form.Label>
              <Form.Control
                ref={confirmPasswordRef}
                type="password"
                placeholder="Confirm Password"
                required
              />
            </Form.Group>
          )}
          {signIn ? (
            <>
              {" "}
              <Button className="w-100 mt-2" variant="success" type="submit">
                {isLoading ? <LoadingSpinner /> : "Login"}
              </Button>
              <div className="mt-2 text-center">
                <Link className="text-decoration-none" to="/resetPassword">
                  Forgot Password
                </Link>
              </div>
            </>
          ) : (
            <Button className="w-100 mt-2" variant="success" type="submit">
              {isLoading ? <LoadingSpinner /> : "Sign Up"}
            </Button>
          )}
          {show && (
            <ErrorMessage errorMessage={errorMessage} setShow={setShow} />
          )}
        </Form>

        {
          <div className="text-center mt-3">
            <Button variant="dark" onClick={onClickHandler} className="">
              {signIn ? "First Time, then Sign Up" : "Have an Account? Login"}
            </Button>
          </div>
        }
      </Card>
    </Container>
  );
};

export default Auth;
