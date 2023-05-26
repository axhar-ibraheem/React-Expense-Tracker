import { useReducer } from "react";
import Context from "./context";

const initialState = {
  idToken: localStorage.getItem("idToken"),
  email: localStorage.getItem("email"),
};
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      localStorage.setItem("idToken", action.token);
      localStorage.setItem("email", action.email);
      return {
        ...state,
        idToken: action.token,
        email: action.email,
      };
    }
    case "LOGOUT": {
      localStorage.removeItem("idToken");
      localStorage.removeItem("email");
      return {
        ...state,
        idToken: "",
        email: "",
      };
    }
  }
};

const ContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loginHandler = (token, email) => {
    dispatch({ type: "LOGIN", token: token, email: email });
  };
  const logoutHandler = () => {
    dispatch({ type: "LOGOUT" });
  };

  const ExpenseContext = {
    idToken: state.idToken,
    apiKey: "AIzaSyBezG9y2vzN3ZEoEkEMYo68vi3GYFkJ99Q",
    email: state.email,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <Context.Provider value={ExpenseContext}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
