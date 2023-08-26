import { useRef} from "react";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import LoadingSpinner from "../UI/LoadingSpinner";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { showNotification } from "../../store/authSlice";
import { setIsLoading } from "../../store/uiSlice";
const ForgotPassword = () => {
  const emailRef = useRef();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.ui.isLoading);
  const apiKey = useSelector((state) => state.auth.apiKey);

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      dispatch(setIsLoading(true));
      const enteredEmail = emailRef.current.value;
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`,
        {
          requestType: "PASSWORD_RESET",
          email: enteredEmail,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      if (response.status === 200) {
        console.log(data);
        const message = "A password reset link has been sent to your Email";
        dispatch(showNotification({ message: message, variant: "info" }));
      }
    } catch (error) {
      const message = error.response.data.error.message;
      dispatch(showNotification({ message: message, variant: "danger" }));
    } finally {
      dispatch(setIsLoading(false));
    }
  };
  return (
    <Form onSubmit={onSubmitHandler} className="py-4 text-dark">
      <div className="text-center pt-lg-4 pb-lg-4">
        <h6>Enter your email id with which you have to registered.</h6>
      </div>
      <FloatingLabel
        className="mt-4"
        controlId="floatingPassword"
        label="Email"
      >
        <Form.Control
          className="border-0 border-bottom rounded-0"
          type="email"
          placeholder="Email"
          required
          ref={emailRef}
        />
      </FloatingLabel>
      <div className="text-center mt-4 mt-lg-5">
        <Button type="submit" className="w-100" variant="info">
          {isLoading ? <LoadingSpinner /> : "Send Link"}
        </Button>
      </div>
    </Form>
  );
};

export default ForgotPassword;
