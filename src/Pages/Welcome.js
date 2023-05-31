import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logout from "../Components/Logout";
import Expenses from "../Components/Expenses";
import DarkMode from "../Components/DarkMode";
const Welcome = () => {
  return (
    <Container className="">
      <Row className="align-items-center border-bottom border-2 border-success pb-1 pt-2">
        <Col lg="6" className="d-flex ">
          <div className="mx-auto mx-lg-0">
            <h5>Welcome to Expense Tracker!</h5>
          </div>
        </Col>
        <Col className="d-flex mt-2 mt-md-0" lg={6}>
          <div className="ms-lg-auto mx-auto mx-lg-0">
            <h5 className="d-inline pe-3">Your Profile Is Incomplete</h5>
            <Link to="/profileupdate" className="fst-italic me-4">
              Complete Now
            </Link>
          </div>
        </Col>
      </Row>
      <div className="d-flex justify-content-end align-items-center mt-2 ">
        <DarkMode />
        <Logout />
      </div>
      <Expenses />
    </Container>
  );
};

export default Welcome;
