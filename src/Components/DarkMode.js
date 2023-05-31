import { ButtonGroup, Button, Form } from "react-bootstrap";
import { toggleTheme } from "../store/themeSlice";
import { useSelector, useDispatch } from "react-redux";

const DarkMode = () => {
  const theme = useSelector((state) => state.theme.theme);
  const activatePremium = useSelector((state) => state.expenses.premium);
  const dispatch = useDispatch();

  const darkModeHandler = () => {
    dispatch(toggleTheme());
  };
  const buttonTheme = theme === "dark" ? "light" : "secondary";
  const toggleThemeHandler = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className="me-3">
      {activatePremium && (
        <Form>
          <Button className="rounded-pill" variant={buttonTheme}>
            <Form.Check
              onChange={toggleThemeHandler}
              type="switch"
              id="custom-switch"
              label={"Dark"}
            />
          </Button>
        </Form>
      )}
    </div>
  );
};

export default DarkMode;
