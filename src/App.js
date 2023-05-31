import { Switch, Route, Redirect } from "react-router-dom";
import Auth from "./Pages/Auth";
import Welcome from "./Pages/Welcome";
import ProfileUpdate from "./Pages/ProfileUpdate";
import ForgotPassword from "./Pages/ForgotPassword";
import { useDispatch, useSelector } from "react-redux";

import { addExpense } from "./store/expensesSlice";
import axios from "axios";
import { setIsLoading } from "./store/expensesSlice";
import { useEffect } from "react";

function App() {
  const auth = useSelector((state) => state.auth.isAuthenticated);

  const email = useSelector((state) => state.auth.email);
  const userEmail = email.replace(/[.]/g, "");
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const containerStyle = {
    backgroundColor: theme === "dark" ? "#111" : "#fff",
    color: theme === "dark" ? "#fff" : "#000",
    minHeight: "100vh",
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
        dispatch(setIsLoading(false));
      }
    }
    getExpenses();
  }, []);

  return (
    <div style={containerStyle}>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/auth" />
        </Route>
        <Route path="/resetPassword">
          <ForgotPassword />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        {auth && (
          <Route Route path="/welcome">
            <Welcome />
          </Route>
        )}
        {auth && (
          <Route path="/profileupdate">
            <ProfileUpdate></ProfileUpdate>
          </Route>
        )}
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
