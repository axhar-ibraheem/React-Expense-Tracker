import { Form, Row, Col, Button, Container, Accordion } from "react-bootstrap";
import { useContext, useRef, useEffect } from "react";
import axios from "axios";
import Context from "../store/context";

const ExpenseForm = (props) => {
  const moneyRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const ctx = useContext(Context);
  const userEmail = ctx.email.replace(/[.]/g, "");

  const onAddExpenseHandler = async (e) => {
    e.preventDefault();
    const expenseItem = [
      {
        money: moneyRef.current.value,
        description: descriptionRef.current.value,
        category: categoryRef.current.value,
      },
    ];
    const response = await axios.post(
      `https://react-expense-tracker-25b41-default-rtdb.firebaseio.com/expenses${userEmail}.json`,
      ...expenseItem,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;
    if (response.status === 200) {
      expenseItem.forEach((item) => (item.id = data.name));
      props.onAddExpense(expenseItem);
    }
  };

  useEffect(() => {
    async function getExpenses() {
      const response = await axios.get(
        `https://react-expense-tracker-25b41-default-rtdb.firebaseio.com/expenses${userEmail}.json`
      );
      const data = response.data;
      if (response.status === 200) {
        const arr = [];
        for (let key in data) {
          let obj = { id: key, ...data[key] };
          arr.push(obj);
        }
        props.onAddExpense(arr);
      }
    }
    getExpenses();
  }, []);

  return (
    <Container className="">
      <Row>
        <Col lg="10" className="mx-auto">
          <Accordion className="mt-2">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <span className="fw-bold fs-5">Add Expense</span>
              </Accordion.Header>
              <Accordion.Body className="">
                <Form
                  onSubmit={onAddExpenseHandler}
                  className="shadow rounded py-3 mt-2 bg-info"
                >
                  <Row className="mb-3 justify-content-center px-4 px-lg-0">
                    <Form.Group
                      className="mb-2 mb-lg-0"
                      as={Col}
                      lg={"auto"}
                      controlId="formGridEmail"
                    >
                      <Form.Label className="fw-bold fs-6">
                        Money Spent
                      </Form.Label>
                      <Form.Control type="number" ref={moneyRef} required />
                    </Form.Group>
                    <Form.Group
                      className="mb-2 mb-lg-0"
                      as={Col}
                      lg={4}
                      controlId="formGridPassword"
                    >
                      <Form.Label className="fw-bold fs-6">
                        Expense Description
                      </Form.Label>
                      <Form.Control ref={descriptionRef} type="text" required />
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      lg={2}
                      className="mb-2 mb-lg-0"
                      controlId="formGridPassword"
                    >
                      <Form.Label className="fw-bold fs-6">Category</Form.Label>
                      <Form.Select
                        ref={categoryRef}
                        aria-label="Default select example"
                      >
                        <option value="Food">Food</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Salary">Salary</option>
                        <option value="Clothing">Clothing</option>
                      </Form.Select>
                    </Form.Group>
                    <Col lg={"auto"} className="align-self-end">
                      <Button
                        type="submit"
                        variant="dark"
                        className="mt-4 mt-lg-0 w-100"
                      >
                        Add Expense
                      </Button>
                    </Col>
                    <Col lg={"auto"} className="align-self-end">
                      <Button variant="danger" className="mt-4 mt-lg-0 w-100">
                        Cancel
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

export default ExpenseForm;
