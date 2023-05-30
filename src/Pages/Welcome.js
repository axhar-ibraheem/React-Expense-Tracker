import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logout from "../Components/Logout";
import Expenses from "../Components/Expenses";

const Welcome = () => {
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
            <Link to="/profileupdate" className="fst-italic me-4">
              Complete Now
            </Link>
            <Logout />
          </div>
        </Col>
      </Row>
      <Expenses />
    </Container>
  );
};

export default Welcome;
