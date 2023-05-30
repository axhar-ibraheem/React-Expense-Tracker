import { Switch, Route, Redirect } from "react-router-dom";
import Auth from "./Pages/Auth";
import Welcome from "./Pages/Welcome";
import ProfileUpdate from "./Pages/ProfileUpdate";
import ForgotPassword from "./Pages/ForgotPassword";
import { useSelector } from "react-redux";

function App() {
  const auth = useSelector((state) => state.auth.isAuthenticated);

  return (
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
  );
}

export default App;
