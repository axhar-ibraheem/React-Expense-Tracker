import "./App.css";
import { Switch, Route } from "react-router-dom";
import Auth from "./Pages/Auth";
import Welcome from "./Pages/Welcome";

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Auth />
      </Route>
      <Route path="/welcome">
        <Welcome />
      </Route>
    </Switch>
  );
}

export default App;
