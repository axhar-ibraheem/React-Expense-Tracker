import { Form, Button, FloatingLabel } from "react-bootstrap";
import LoadingSpinner from "../UI/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import React, { useRef } from "react";
import { showNotification } from "../../store/authSlice";
import { setIsLoading } from "../../store/uiSlice";
const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const apiKey = useSelector((state) => state.auth.apiKey);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.ui.isLoading);

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      dispatch(setIsLoading(true));
      const enteredEmail = emailRef.current.value;
      const enteredPassword = passwordRef.current.value;
      const enteredConfirmPassword = confirmPasswordRef.current.value;

      if (enteredPassword !== enteredConfirmPassword) {
        dispatch(showNotification("Passwords don't match"));
        dispatch(setIsLoading(false));
        return;
      }

      const endPointUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;

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
  
      if (response.status === 200) {
        const message = "Welcome, you can now login with your credentials";
        dispatch(showNotification({ message: message, variant: "info" }));
      }
    } catch (error) {
      const errorMessage = error.response.data.error.message;
      dispatch(showNotification({ message: errorMessage, variant: "danger" }));
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <Form onSubmit={onSubmitHandler} className="text-dark my-3">
      <FloatingLabel controlId="floatingEmail" label="Email">
        <Form.Control
          className="border-0 border-bottom  rounded-0 "
          type="email"
          placeholder="Email"
          ref={emailRef}
          required
        />
      </FloatingLabel>
      <FloatingLabel
        className="mt-3 border-0"
        controlId="floatingPassword"
        label="Password"
      >
        <Form.Control
          className="border-0 border-bottom rounded-0 "
          type="password"
          placeholder="Password"
          ref={passwordRef}
          required
        />
      </FloatingLabel>
      <FloatingLabel
        className="mt-3 border-0 "
        controlId="floatingConfirmPassword"
        label="Confirm Password"
      >
        <Form.Control
          className="border-0 border-bottom rounded-0 "
          type="password"
          placeholder="Password"
          ref={confirmPasswordRef}
          required
        />
      </FloatingLabel>
      <Button className="w-100 my-4" variant="warning" type="submit">
        {isLoading ? <LoadingSpinner /> : "Sign Up"}
      </Button>
    </Form>
  );
};

export default SignUp;
