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
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    async function getExpenses() {
      const response = await axios.get(
        `https://react-expense-tracker-25b41-default-rtdb.firebaseio.com/expenses${userEmail}.json`
      );
      const data = response.data;

      if (response.status === 200) {
        const expenseItem = [];
        for (const key in data) {
          const obj = { id: key, ...data[key] };
          expenseItem.push(obj);
        }
        dispatch(addExpense({ expenseItem: expenseItem }));
        setIsLoading(false);
      }
    }
    getExpenses();
  }, []);

  return (
    <>
      <ExpenseForm item={item} count={count} />
      <ExpenseItems
        onEdit={onEditHandler}
        onDelete={onDeleteExpenseHandler}
        expenses={expenses}
        isLoading={isLoading}
      />
    </>
  );
};

export default Expenses;
