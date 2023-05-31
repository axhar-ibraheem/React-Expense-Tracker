import {
  Form,
  Row,
  Col,
  Button,
  Container,
  Collapse,
  Alert,
} from "react-bootstrap";
import { useRef, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addExpense } from "../store/expensesSlice";
import { activatePremium } from "../store/expensesSlice";
import DownloadExpenses from "./DownloadExpenses";

const ExpenseForm = (props) => {
  const moneyRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.email);
  const userEmail = email.replace(/[.]/g, "");
  const expenses = useSelector((state) => state.expenses.expenses);
  const premium = useSelector((state) => state.expenses.premium);
  const minimum = expenses.reduce((accum, curVal) => {
    return accum + +curVal.money;
  }, 0);

  const clearInputFields = () => {
    moneyRef.current.value = "";
    descriptionRef.current.value = "";
  };

  const onToggleHandler = () => {
    setOpen(!open);
  };

  const onClickHandler = () => {
    dispatch(addExpense({ expenseItem: [props.item] }));
    clearInputFields();
    setIsEditing(false);
  };

  const showPremium = false;

  const activatePremiumHandler = () => {
    dispatch(activatePremium());
    setShow(false);
  };

  const editExpense = useCallback(() => {
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
        const expense = [];
        const obj = { id: props.item.id, ...data };
        expense.push(obj);
        dispatch(addExpense({ expenseItem: expense }));
        setIsEditing(false);
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
        dispatch(addExpense({ expenseItem: expenseItem }));
      }
    }
    clearInputFields();
  };

  return (
    <Container className="">
      {premium && <DownloadExpenses />}
      {minimum >= 10000 && (
        <Alert
          className="mx-auto mt-2"
          style={{ maxWidth: "62rem" }}
          dismissible
          onClose={() => setShow(false)}
        >
          <div className="d-flex justify-content-between">
            <p className="fw-bold">Go for Premium</p>
            <Button onClick={activatePremiumHandler} variant="success">
              Activate Premium
            </Button>
          </div>
        </Alert>
      )}
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
            style={{ maxWidth: "62rem" }}
            onSubmit={onAddExpenseHandler}
            className="shadow rounded py-3 mt-3 bg-info mx-auto "
          >
            <Row className="mb-3 justify-content-center px-4 px-lg-0">
              <Form.Group
                className="mb-2 mb-lg-0"
                as={Col}
                lg={"auto"}
                controlId="formGridMoney"
              >
                <Form.Label className="fw-bold fs-6 text-dark">
                  Money Spent
                </Form.Label>
                <Form.Control type="number" min={0} ref={moneyRef} required />
              </Form.Group>
              <Form.Group
                className="mb-2 mb-lg-0"
                as={Col}
                lg={3}
                controlId="formGridDescription"
              >
                <Form.Label className="fw-bold fs-6 text-dark">
                  Expense Description
                </Form.Label>
                <Form.Control ref={descriptionRef} type="text" required />
              </Form.Group>
              <Form.Group
                as={Col}
                lg={3}
                className="mb-2 mb-lg-0"
                controlId="formGridCategory"
              >
                <Form.Label className="fw-bold fs-6 text-dark">
                  Category
                </Form.Label>
                <Form.Select
                  ref={categoryRef}
                  aria-label="Default select example"
                >
                  <option value="Food">Food</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Salary">Salary</option>
                  <option value="Health">Health</option>
                  <option value="Personal Care">Personal Care</option>
                </Form.Select>
              </Form.Group>

              {isEditing ? (
                <Col lg={"auto"} className="align-self-end">
                  <div className="">
                    <Button
                      type="submit"
                      variant="dark"
                      className="mt-4 mt-lg-0 "
                    >
                      Update Expense
                    </Button>
                    <Button
                      onClick={onClickHandler}
                      variant="danger"
                      className="ms-3 mt-4 mt-lg-0"
                    >
                      Cancel
                    </Button>
                  </div>
                </Col>
              ) : (
                <Col lg={2} className="align-self-end">
                  <Button
                    type="submit"
                    variant="dark"
                    className="mt-4 mt-lg-0 w-100 d-inline"
                  >
                    Add Expense
                  </Button>
                </Col>
              )}
            </Row>
          </Form>
        </div>
      </Collapse>
    </Container>
  );
};

export default ExpenseForm;
