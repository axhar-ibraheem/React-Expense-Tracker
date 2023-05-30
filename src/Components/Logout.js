import { Button } from "react-bootstrap";
import { logout } from "../store/authSlice";
import { useDispatch } from "react-redux";

const Logout = () => {
  const dispatch = useDispatch();

  const onLogoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Button onClick={onLogoutHandler} variant="dark">
      Logout
    </Button>
  );
};

export default Logout;
