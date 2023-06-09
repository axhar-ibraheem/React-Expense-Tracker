import { Switch, Route, Redirect } from "react-router-dom";
import Auth from "./Pages/Auth";
import Welcome from "./Pages/Welcome";
import ProfileUpdate from "./Pages/ProfileUpdate";
import { useDispatch, useSelector } from "react-redux";
import { addExpense } from "./store/expensesSlice";
import axios from "axios";
import { displaySpinner } from "./store/expensesSlice";
import { useEffect } from "react";
import { clearExpenses } from "./store/expensesSlice";
import { setTotalExpenses } from "./store/expensesSlice";
import Mainnav from "./Pages/Mainnav";
function App() {
  const auth = useSelector((state) => state.auth.isAuthenticated);
  const email = useSelector((state) => state.auth.email);

  let userEmail;
  if (auth) {
    userEmail = email.replace(/[.]/g, "");
  }
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  const containerStyle = {
    backgroundColor: theme === "dark" ? "#111" : "#fff",
    color: theme === "dark" ? "#fff" : "#000",
    minHeight: "100vh",
  };

  useEffect(() => {
    async function getExpenses() {
      try {
        dispatch(displaySpinner(true));
        const response = await axios.get(
          `https://react-expense-tracker-25b41-default-rtdb.firebaseio.com/expenses${userEmail}.json`
        );
        const data = response.data;

        if (response.status === 200) {
          let arr = [];
          for (const key in data) {
            const obj = { id: key, ...data[key] };
            arr.push(obj);
            dispatch(addExpense({ expenseItem: obj }));
          }
          dispatch(setTotalExpenses());
        }
      } catch (error) {
        alert(error.message);
      } finally {
        dispatch(displaySpinner(false));
      }
    }
    getExpenses();
    return () => {
      dispatch(clearExpenses());
    };
  }, [userEmail]);

  return (
    <div style={containerStyle}>
      {auth && <Mainnav />}
      <Switch>
        <Route path="/" exact>
          <Redirect to="/auth" />
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
