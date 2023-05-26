import { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseItems from "./ExpenseItems";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const onAddExpenseHandler = (item) => {
    setExpenses([...item, ...expenses]);
  };
  return (
    <>
      <ExpenseForm onAddExpense={onAddExpenseHandler} />
      <ExpenseItems expenses={expenses} />
    </>
  );
};

export default Expenses;
