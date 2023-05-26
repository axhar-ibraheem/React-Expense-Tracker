import { Col, Container, ListGroup, Row, Card } from "react-bootstrap";

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
            <ListGroup.Item key={item.id} className="mb-2 d-flex">
              <Col xs="6">
                <span className="fw-bold ">{item.description}</span>
              </Col>
              <Col xs="2">
                <span className="fw-bold mx-auto">{item.category}</span>
              </Col>
              <Col xs="4" className="d-flex">
                <span className="fw-bold fs-5 ms-auto text-danger">{`$${item.money}`}</span>
              </Col>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </Container>
  );
};

export default ExpenseItems;
