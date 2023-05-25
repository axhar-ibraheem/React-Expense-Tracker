import { useReducer } from "react";
import Context from "./context";

const initialState = {
  idToken: localStorage.getItem("idToken"),
};
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      localStorage.setItem("idToken", action.token);
      return {
        ...state,
        idToken: action.token,
      };
    }
    case "LOGOUT": {
      localStorage.removeItem("idToken");
      return {
        ...state,
        idToken: "",
      };
    }
  }
};

const ContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loginHandler = (token) => {
    dispatch({ type: "LOGIN", token: token });
  };
  const logoutHandler = () => {
    dispatch({ type: "LOGOUT" });
  };

  const ExpenseContext = {
    idToken: state.idToken,
    apiKey: "AIzaSyBezG9y2vzN3ZEoEkEMYo68vi3GYFkJ99Q",
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <Context.Provider value={ExpenseContext}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
