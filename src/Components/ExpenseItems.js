import { Col, Container, ListGroup, Row, Card, Button } from "react-bootstrap";
import LoadingSpinner from "./LoadingSpinner";
const ExpenseItems = (props) => {
  console.log(props);
  return (
    <Container>
      <Card
        className="mx-auto mt-3 overflow-hidden border-0 shadow"
        style={{ maxWidth: "40rem" }}
      >
        <ListGroup variant="flush">
          {props.expenses.map((item) => (
            <ListGroup.Item
              key={item.id}
              className="mb-2 d-flex align-items-center"
            >
              <Col xs="6">
                <p className="fw-bold ">{item.description}</p>
                <p className="fw-bold mx-auto">{item.category} </p>
              </Col>
              <Col xs="2">
                <span className="fw-bold fs-5 ms-auto text-danger">{`$${item.money}`}</span>
              </Col>
              <Col xs="4" className="d-flex justify-content-end">
                <div>
                  <Button
                    onClick={() => props.onEdit(item)}
                    variant="info"
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => props.onDelete(item.id)}
                    variant="danger"
                  >
                    Delete
                  </Button>
                </div>
              </Col>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </Container>
  );
};

export default ExpenseItems;
