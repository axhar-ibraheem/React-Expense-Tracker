import "./App.css";
import { Switch, Route } from "react-router-dom";
import Auth from "./Pages/Auth";
import Welcome from "./Pages/Welcome";
import ProfileUpdate from "./Pages/ProfileUpdate";

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Auth />
      </Route>
      <Route path="/welcome">
        <Welcome />
      </Route>
      <Route path="/profileupdate">
        <ProfileUpdate></ProfileUpdate>
      </Route>
    </Switch>
  );
}

export default App;
