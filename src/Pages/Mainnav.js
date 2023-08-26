import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logout from "../Components/Login/Logout";
import DarkMode from "../Components/UI/DarkMode";
import { useSelector } from "react-redux";
const Mainnav = () => {
  const premium = useSelector((state) => state.expenses.premium);

  return (
    <Navbar
      className="shadow"
      collapseOnSelect
      expand="lg"
      bg="info"
      variant="light"
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to={"/welcome"}
          className="fw-bold"
          href="#home"
        >
          Expense <span className="text-danger">Tracker</span>{" "}
        </Navbar.Brand>
        <Navbar.Toggle
          className="bg-light"
          aria-controls="responsive-navbar-nav"
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto fw-bold">
            <Nav.Link as={Link} className="pe-4" to="/profileupdate">
              My Profile
            </Nav.Link>
            {premium && <DarkMode />}
            <Logout />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Mainnav;
