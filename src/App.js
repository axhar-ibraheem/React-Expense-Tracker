import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Auth from "./Pages/Auth";
import Welcome from "./Pages/Welcome";
import ProfileUpdate from "./Pages/ProfileUpdate";
import Context from "./store/context";
import React, { useContext } from "react";
import ForgotPassword from "./Pages/ForgotPassword";
function App() {
  const ctx = useContext(Context);

  let isLoggedIn = !!ctx.idToken;
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
      {isLoggedIn && (
        <Route Route path="/welcome">
          <Welcome />
        </Route>
      )}
      {isLoggedIn && (
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
