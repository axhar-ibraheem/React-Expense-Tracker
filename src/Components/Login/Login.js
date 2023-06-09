import { Form, Button, FloatingLabel } from "react-bootstrap";
import LoadingSpinner from "../UI/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import { login } from "../../store/authSlice";
import React, { useRef } from "react";
import { showNotification } from "../../store/authSlice";
import { setIsLoading } from "../../store/uiSlice";
const Login = () => {
  const isLoading = useSelector((state) => state.ui.isLoading);
  const dispatch = useDispatch();
  const history = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();
  const apiKey = useSelector((state) => state.auth.apiKey);
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      dispatch(setIsLoading(true));

      const enteredEmail = emailRef.current.value;
      const enteredPassword = passwordRef.current.value;

      const endPointUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

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

      if (response.status === 200) {
        dispatch(login({ idToken: data.idToken, email: data.email }));
        history.replace("/welcome");
      }
    } catch (error) {
      const errorMessage = error.response.data.error.message;
      dispatch(showNotification({ message: errorMessage, variant: "danger" }));
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <Form onSubmit={onSubmitHandler} className="text-dark">
      <div className="text-center py-3">
        <h3 className="fw-bold text-success">Login</h3>
      </div>
      <FloatingLabel
        controlId="floatingEmail"
        className="text-dark"
        label="Email"
      >
        <Form.Control
          className="border-0 border-bottom rounded-0"
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
          className="border-0 border-bottom rounded-0"
          type="password"
          placeholder="Password"
          ref={passwordRef}
          required
        />
      </FloatingLabel>
      <Button className="w-100 my-5" variant="success" type="submit">
        {isLoading ? <LoadingSpinner /> : "Login"}
      </Button>
    </Form>
  );
};

export default Login;
