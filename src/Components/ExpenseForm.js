import { Form, Row, Col, Button, Container, Collapse } from "react-bootstrap";
import { useContext, useRef, useEffect, useState, useCallback } from "react";
import axios from "axios";
import Context from "../store/context";

const ExpenseForm = (props) => {
  const moneyRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const ctx = useContext(Context);
  const userEmail = ctx.email.replace(/[.]/g, "");

  const clearInputFields = () => {
    moneyRef.current.value = "";
    descriptionRef.current.value = "";
  };

  const onToggleHandler = () => {
    setOpen(!open);
  };

  const editExpense = useCallback(() => {
    console.log(props.item);
    setOpen(true);
    if (props.item.money) {
      moneyRef.current.value = props.item.money;
      descriptionRef.current.value = props.item.description;
      categoryRef.current.value = props.item.category;
      setIsEditing(true);
    } else {
      moneyRef.current.value = "";
      descriptionRef.current.value = "";
      categoryRef.current.value = "";
    }
  }, [props.item, props.count]);

  useEffect(() => {
    editExpense();
  }, [editExpense]);

  const onAddExpenseHandler = async (e) => {
    e.preventDefault();
    const expenseItem = [
      {
        money: moneyRef.current.value,
        description: descriptionRef.current.value,
        category: categoryRef.current.value,
      },
    ];

    const endPointUrl = isEditing
      ? `https://react-expense-tracker-25b41-default-rtdb.firebaseio.com/expenses${userEmail}/${props.item.id}.json`
      : `https://react-expense-tracker-25b41-default-rtdb.firebaseio.com/expenses${userEmail}.json`;

    if (isEditing) {
      const response = await axios.put(endPointUrl, ...expenseItem, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = response.data;
      console.log(data);
      if (response.status === 200) {
        const arr = [];
        const obj = { id: props.item.id, ...data };
        arr.push(obj);
        props.onAddExpense(arr);
        setIsEditing(false);
        clearInputFields();
      }
    } else {
      const response = await axios.post(endPointUrl, ...expenseItem, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = response.data;
      if (response.status === 200) {
        expenseItem.forEach((item) => (item.id = data.name));
        props.onAddExpense(expenseItem);
      }
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
          <div className="text-center mt-2">
            <Button
              variant="info"
              className="fw-bold px-4"
              onClick={onToggleHandler}
            >
              Add Expense
            </Button>
          </div>
          <Collapse in={open}>
            <div>
              <Form
                onSubmit={onAddExpenseHandler}
                className="shadow rounded py-3 mt-3 bg-info"
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
                    {isEditing ? (
                      <Button
                        type="submit"
                        variant="dark"
                        className="mt-4 mt-lg-0 w-100"
                      >
                        Update Expense
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        variant="dark"
                        className="mt-4 mt-lg-0 w-100"
                      >
                        Add Expense
                      </Button>
                    )}
                  </Col>
                  {/* <Col lg={"auto"} className="align-self-end">
                    <Button
                      onClick={onCancelHandler}
                      variant="danger"
                      className="mt-4 mt-lg-0 w-100"
                    >
                      Cancel
                    </Button>
                  </Col> */}
                </Row>
              </Form>
            </div>
          </Collapse>
        </Col>
      </Row>
    </Container>
  );
};

export default ExpenseForm;
