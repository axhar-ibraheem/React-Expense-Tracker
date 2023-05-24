import { useReducer } from "react";
import Context from "./context";

const initialState = {
  idToken: localStorage.getItem("IdToken"),
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
  }
};
const ContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loginHandler = (token) => {
    dispatch({ type: "LOGIN", token: token });
  };

  const ExpenseContext = {
    idToken: state.idToken,
    apiKey: "AIzaSyBezG9y2vzN3ZEoEkEMYo68vi3GYFkJ99Q",
    login: loginHandler,
  };

  return (
    <Context.Provider value={ExpenseContext}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
