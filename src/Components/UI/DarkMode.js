import { Form } from "react-bootstrap";
import { toggleTheme } from "../../store/themeSlice";
import { useSelector, useDispatch } from "react-redux";

const DarkMode = () => {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const buttonTheme = theme === "dark" ? "bg-dark" : "bg-light";
  const label = theme === "dark" ? "Dark" : "Light";
  const toggleThemeHandler = () => {
    dispatch(toggleTheme());
  };

  const checked = theme === "dark" ? true : false;

  return (
    <div className="pe-lg-4 mb-3 mb-lg-0 mt-2 mt-lg-0 ">
      <Form>
        <div className={`rounded-pill ${buttonTheme} px-3 py-2`}>
          <Form.Check
            onChange={toggleThemeHandler}
            type="switch"
            id="custom-switch"
            label={label}
            checked={checked}
          />
        </div>
      </Form>
    </div>
  );
};

export default DarkMode;
