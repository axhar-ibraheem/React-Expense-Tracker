import { Button } from "react-bootstrap";
import Context from "../store/context";
import { useContext } from "react";

const Logout = () => {
  const ctx = useContext(Context);

  const onLogoutHandler = () => {
    ctx.logout();
  };

  return (
    <Button onClick={onLogoutHandler} variant="dark">
      Logout
    </Button>
  );
};

export default Logout;
