import { Button } from "react-bootstrap";
import { logout } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { clearDate } from "../../store/expensesFilterSlice";
import { clearFilter } from "../../store/expensesSlice";
const Logout = () => {
  const dispatch = useDispatch();

  const onLogoutHandler = () => {
    dispatch(logout());
    dispatch(clearDate());
    dispatch(clearFilter());
  };

  return (
    <Button onClick={onLogoutHandler} className="inline" variant="dark">
      Logout
    </Button>
  );
};

export default Logout;
