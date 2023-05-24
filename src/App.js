import "./App.css";
import { Switch, Route } from "react-router-dom";
import Auth from "./Pages/Auth";

function App() {
  return (
    <Switch>
      <Route path="/auth">
        <Auth />
      </Route>
    </Switch>
  );
}

export default App;
