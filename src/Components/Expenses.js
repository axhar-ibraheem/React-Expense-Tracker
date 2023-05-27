import { useState, useContext } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseItems from "./ExpenseItems";
import axios from "axios";
import Context from "../store/context";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [item, setItem] = useState("");
  const [count, setCount] = useState(0);
  const ctx = useContext(Context);
  const userEmail = ctx.email.replace(/[.]/g, "");
  const onAddExpenseHandler = (item) => {
    setExpenses([...item, ...expenses]);
  };

  const onDeleteExpenseHandler = async (id) => {
    const response = await axios.delete(
      `https://react-expense-tracker-25b41-default-rtdb.firebaseio.com/expenses${userEmail}/${id}.json`
    );

    const data = response.data;
    console.log(data);

    let expenseItems = expenses.filter((item) => item.id !== id);
    setExpenses(expenseItems);
  };

  const onButtonClick = () => {};

  const onEditHandler = (item) => {
    setItem(item);
    let expenseItems = expenses.filter((ele) => ele.id !== item.id);
    setExpenses(expenseItems);
    setCount((count) => count + 1);
  };

  return (
    <>
      <ExpenseForm
        onAddExpense={onAddExpenseHandler}
        item={item}
        onButtonClick={onButtonClick}
        count={count}
      />
      <ExpenseItems
        onEdit={onEditHandler}
        onDelete={onDeleteExpenseHandler}
        expenses={expenses}
      />
    </>
  );
};

export default Expenses;
