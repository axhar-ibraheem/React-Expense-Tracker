import React from "react";

const Context = React.createContext({
  idToken: "",
  login: () => {},
  apiKey: "",
});

export default Context;
