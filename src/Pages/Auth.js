import React, { useState } from "react";
import { Container, Row, Col, ToggleButton } from "react-bootstrap";
import Login from "../Components/Login/Login";
import SignUp from "../Components/Login/SignUp";
import ForgotPassword from "../Components/Login/ForgotPassword";
import ErrorMessage from "../Components/UI/ErrorMessage";
import { useSelector } from "react-redux";

const Auth = () => {
  const [active, setActive] = useState("login");
  const errorMessage = useSelector((state) => state.auth.notification);

  const loginSelector = () => {
    setActive("login");
  };
  const signupSelector = () => {
    setActive("signup");
  };
  const forgotPasswordSelector = () => {
    setActive("forgotpassword");
  };

  return (
    <Container className="">
      <div className="text-center pt-5">
        <h2 className="">
          Welcome to{" "}
          <span className="text-warning fst-italic">Expense Tracker</span>{" "}
        </h2>
        <p>Please Login to continue.</p>
      </div>
      {errorMessage.message && (
        <ErrorMessage
          errorMessage={errorMessage.message}
          variant={errorMessage.variant}
        />
      )}
      <Row className="mx-auto justify-content-center w-100 mt-5">
        <Col lg={"auto"} className="bg-light px-0 shadow-lg">
          <div className="d-flex flex-lg-column justify-content-evenly h-100">
            <ToggleButton
              variant="outline-success"
              className="w-100 h-100 border-0 rounded-0 fw-bold"
              onClick={loginSelector}
              type="checkbox"
              onChange={loginSelector}
              checked={active === "login"}
            >
              <div className="my-lg-3">
                <i className="bi fs-3 bi-person-check-fill"></i>
                <p className="mb-0">Login</p>
              </div>
            </ToggleButton>

            <ToggleButton
              variant="outline-warning"
              className="w-100 h-100 border-0 rounded-0 fw-bold"
              onClick={signupSelector}
              type="checkbox"
              checked={active === "signup"}
            >
              <div className="my-lg-3">
                <i className="bi fs-3 bi-check-circle-fill"></i>
                <p className="mb-0">Sign Up</p>
              </div>
            </ToggleButton>

            <ToggleButton
              onClick={forgotPasswordSelector}
              variant="outline-info"
              className="w-100 py-auto h-100 border-0 rounded-0 fw-bold"
              type="checkbox"
              checked={active === "forgotpassword"}
            >
              <div className="my-lg-3">
                <i className="bi fs-3 bi-key-fill"></i>
                <p className="pt-0">Forgot Password</p>
              </div>
            </ToggleButton>
          </div>
        </Col>
        <Col lg={5} className="p-3 mt-4 bg-light mt-lg-0 shadow-lg ms-lg-4">
          {active === "login" && <Login />}
          {active === "signup" && <SignUp />}
          {active === "forgotpassword" && <ForgotPassword />}
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;
