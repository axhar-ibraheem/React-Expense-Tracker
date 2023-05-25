import { useContext, useRef, useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import Context from "../store/context";
import LoadingSpinner from "../Components/LoadingSpinner";
import ErrorMessage from "../Components/ErrorMessage";

const ForgotPassword = () => {
  const emailRef = useRef();
  const ctx = useContext(Context);
  const [message, setMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const enteredEmail = emailRef.current.value;
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${ctx.apiKey}`,
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: enteredEmail,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        setMessage(true);
      } else {
        const errorMessage = data.error.message;
        throw new Error(errorMessage);
      }
    } catch (error) {
      setErrorMessage(error.message);
      setShow(true);
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Container
      style={{ minHeight: "100vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <Card style={{ maxWidth: "30rem" }} className="w-100 shadow">
        <Card.Body>
          <div className="mb-5 text-center fw-bold">
            <Card.Text>
              Enter the email with which you have registered
            </Card.Text>
          </div>
          {message && (
            <Alert variant="info">
              A password reset link has been sent to your Mail Id
            </Alert>
          )}
          <Form onSubmit={onSubmitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                ref={emailRef}
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>
            <div className="text-center ">
              <Button type="submit" className="w-100" variant="success">
                {isLoading ? <LoadingSpinner /> : "Send Link"}
              </Button>
            </div>
            {show && (
              <ErrorMessage errorMessage={errorMessage} setShow={setShow} />
            )}

            <div className="mt-2 text-center">
              Already a user?{" "}
              <Link to="/auth" className="text-decoration-none">
                Login
              </Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ForgotPassword;