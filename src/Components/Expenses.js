import { useState, useEffect } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseItems from "./ExpenseItems";
import axios from "axios";
import { deleteExpense, addExpense } from "../store/expensesSlice";
import { useSelector, useDispatch } from "react-redux";
const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [item, setItem] = useState("");
  const [count, setCount] = useState(0);
  const email = useSelector((state) => state.auth.email);
  const userEmail = email.replace(/[.]/g, "");
  const dispatch = useDispatch();

  const onDeleteExpenseHandler = async (id) => {
    const response = await axios.delete(
      `https://react-expense-tracker-25b41-default-rtdb.firebaseio.com/expenses${userEmail}/${id}.json`
    );
    const data = response.data;
    console.log(data);
    dispatch(deleteExpense({ id: id }));
  };

  const onEditHandler = (item) => {
    setItem(item);
    dispatch(deleteExpense({ id: item.id }));
    setCount((count) => count + 1);
  };

  return (
    <>
      <ExpenseForm item={item} count={count} />
      <ExpenseItems
        onEdit={onEditHandler}
        onDelete={onDeleteExpenseHandler}
        expenses={expenses}
      />
    </>
  );
};

export default Expenses;
