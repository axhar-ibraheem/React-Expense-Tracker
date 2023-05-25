import React from "react";

const Context = React.createContext({
  idToken: "",
  login: () => {},
  logout: () => {},
  apiKey: "",
});

export default Context;
