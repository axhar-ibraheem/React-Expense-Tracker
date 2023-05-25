import { Col, Container, ListGroup, ListGroupItem, Row } from "react-bootstrap";

const ExpenseItems = (props) => {
  console.log(props);
  return (
    <Container>
      <Row>
        <ListGroup className="mt-4">
          {props.expenses.map((item) => (
            <Col lg={8} className="mx-auto">
              <ListGroupItem className="d-flex">
                <span>{item.money}</span>
                <span>{item.description}</span>
                <span>{item.category}</span>
              </ListGroupItem>
            </Col>
          ))}
        </ListGroup>
      </Row>
    </Container>
  );
};

export default ExpenseItems;
