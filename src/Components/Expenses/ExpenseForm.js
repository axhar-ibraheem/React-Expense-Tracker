import { Form, Button, ButtonGroup, ToggleButton } from "react-bootstrap";
import { useRef, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addExpense } from "../../store/expensesSlice";
import Income from "./Income";
import { setTotalExpenses } from "../../store/expensesSlice";
const ExpenseForm = () => {
  const moneyRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const dateRef = useRef();

  const [open, setOpen] = useState("expense");
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.email);
  const userEmail = email.replace(/[.]/g, "");

  const clearInputFields = () => {
    moneyRef.current.value = "";
    descriptionRef.current.value = "";
  };

  const onAddExpenseHandler = async (e) => {
    e.preventDefault();
    const expenseItem = {
      money: moneyRef.current.value,
      description: descriptionRef.current.value,
      category: categoryRef.current.value,
      date: dateRef.current.value,
    };

    console.log(expenseItem);

    const endPointUrl = `https://react-expense-tracker-25b41-default-rtdb.firebaseio.com/expenses${userEmail}.json`;
    const response = await axios.post(endPointUrl, expenseItem, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = response.data;
    if (response.status === 200) {
      let expenseObj = { id: data.name, ...expenseItem };
      dispatch(addExpense({ expenseItem: expenseObj }));
      dispatch(setTotalExpenses());
    }
    clearInputFields();
  };
  const expenseSelector = () => {
    setOpen("expense");
  };
  const incomeSelector = () => {
    setOpen("income");
  };
  return (
    <>
      <div className="text-center mb-3">
        <ButtonGroup className="w-100">
          <ToggleButton
            checked={open === "expense"}
            onClick={expenseSelector}
            variant="outline-info"
            type="checkbox"
          >
            Expense
          </ToggleButton>
          <ToggleButton
            onClick={incomeSelector}
            checked={open === "income"}
            variant="outline-info"
            type="checkbox"
          >
            Income
          </ToggleButton>
        </ButtonGroup>
      </div>
      {open === "expense" && (
        <Form
          onSubmit={onAddExpenseHandler}
          className="shadow rounded bg-info bg-gradient p-4"
        >
          <Form.Group className="mb-2 mb-lg-0" controlId="formGridMoney">
            <Form.Label className="fw-bold fs-6 text-dark">
              Money Spent
            </Form.Label>
            <Form.Control type="number" min={0} ref={moneyRef} required />
          </Form.Group>
          <Form.Group className="mb-2 mb-lg-0" controlId="formGridDescription">
            <Form.Label className="fw-bold fs-6 text-dark">
              Expense Description
            </Form.Label>
            <Form.Control ref={descriptionRef} type="text" required />
          </Form.Group>

          <Form.Group className="mb-2 mb-lg-0" controlId="formGridCategory">
            <Form.Label className="fw-bold fs-6 text-dark">Category</Form.Label>
            <Form.Select ref={categoryRef} aria-label="Default select example">
              <option value="Food">Food</option>
              <option value="Transportation">Transportation</option>
              <option value="Salary">Salary</option>
              <option value="Health">Health</option>
              <option value="Personal Care">Personal Care</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-2 mb-lg-0" controlId="formDate">
            <Form.Label className="fw-bold fs-6 text-dark">Date</Form.Label>
            <Form.Control ref={dateRef} type="date" required />
          </Form.Group>

          <Button type="submit" variant="dark" className="mt-4">
            Add Expense
          </Button>
        </Form>
      )}
      {open === "income" && <Income />}
    </>
  );
};

export default ExpenseForm;
