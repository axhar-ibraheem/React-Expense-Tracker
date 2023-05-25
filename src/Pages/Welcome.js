import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import Context from "../store/context";
import { useContext, useState } from "react";

const Welcome = () => {
  const ctx = useContext(Context);
  const [show, setShow] = useState(true);
  const onVerifyEmailHandler = async () => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${ctx.apiKey}`,
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: ctx.idToken,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (response.ok) {
      console.log(data);
    } else {
      const error = data.error.message;
      console.log(error);
    }
  };
  return (
    <Container className="py-3">
      <Row className="align-items-center border-bottom border-2 border-success pb-3">
        <Col lg="6" className="d-flex ">
          <div className="mx-auto mx-lg-0">
            <h3>Welcome to Expense Tracker!</h3>
          </div>
        </Col>
        <Col className="d-flex mt-3 mt-md-0" lg={6}>
          <div className="ms-lg-auto mx-auto mx-lg-0">
            <h5 className="d-inline pe-3">Your Profile Is Incomplete</h5>
            <Link to="/profileupdate" className="fst-italic">
              Complete Now
            </Link>
          </div>
        </Col>
      </Row>

      <Alert
        style={{ maxWidth: "35rem" }}
        variant="danger"
        onClose={() => setShow(false)}
        dismissible
        className="mt-3 mx-auto"
      >
        <Alert.Heading>
          Your email is not verified yet!{" "}
          <Button variant="danger" onClick={onVerifyEmailHandler}>
            Verify it
          </Button>
        </Alert.Heading>
      </Alert>
    </Container>
  );
};

export default Welcome;
