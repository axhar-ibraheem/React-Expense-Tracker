import { Col, Container, ListGroup, Card, Button } from "react-bootstrap";
import LoadingSpinner from "./LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useSelector } from "react-redux";
const ExpenseItems = (props) => {
  const expenses = useSelector((state) => state.expenses.expenses);
  const isLoading = useSelector((state) => state.expenses.isLoading);
  return (
    <Container>
      {isLoading ? (
        <div className="text-center mt-5">
          <LoadingSpinner />
        </div>
      ) : (
        <Card
          className="mx-auto mt-4 overflow-hidden border-0 shadow-lg"
          style={{ maxWidth: "40rem" }}
        >
          <ListGroup variant="flush">
            {expenses.map((item) => (
              <ListGroup.Item
                key={item.id}
                className="mb-2 d-flex align-items-center"
              >
                <Col xs="5">
                  <p className="fw-bold ">{item.description}</p>
                  <p className="fw-bold text-warning mx-auto">
                    {item.category}{" "}
                  </p>
                </Col>
                <Col xs="2">
                  <span className="fw-bold fs-5 ms-auto text-danger">{`$${item.money}`}</span>
                </Col>
                <Col xs="5" className="d-flex justify-content-end">
                  <div>
                    <Button
                      onClick={() => props.onEdit(item)}
                      variant="outline-dark"
                      className="me-2 fw-bold rounded-pill px-3"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => props.onDelete(item.id)}
                      variant="outline-danger"
                      className="rounded-pill"
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </Button>
                  </div>
                </Col>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      )}
    </Container>
  );
};

export default ExpenseItems;
