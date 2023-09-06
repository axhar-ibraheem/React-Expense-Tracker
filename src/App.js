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
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const email = useSelector((state) => state.auth.email);

  let userEmail;
  if (isAuthenticated) {
    userEmail = email.replace(/[.]/g, "");
  }
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  const containerStyle = {
    backgroundColor: theme === "dark" ? "#333333" : "#fff",
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
          for (const key in data) {
            const obj = { id: key, ...data[key] };

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
    // eslint-disable-next-line
  }, [userEmail]);

  return (
    <div style={containerStyle}>
      {isAuthenticated && <Mainnav />}
      <Switch>
        <Route path="/" exact>
          <Redirect to="/auth" />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        {isAuthenticated && (
          <Route Route path="/welcome">
            <Welcome />
          </Route>
        )}
        {isAuthenticated && (
          <Route path="/profileupdate">
            <ProfileUpdate />
          </Route>
        )}

        {isAuthenticated ? (
          <Redirect from="*" to="/welcome" />
        ) : (
          <Redirect from="*" to="/" />
        )}
      </Switch>
    </div>
  );
}

export default App;
