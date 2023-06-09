import { Toast } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { showNotification } from "../../store/authSlice";

const ErrorMessage = (props) => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.auth.notification);

  return (
    <Toast
      className="mx-auto mt-3"
      onClose={() =>
        dispatch(showNotification({ message: null, variant: null }))
      }
      delay={5000}
      bg={props.variant}
      autohide
      show={show}
    >
      <Toast.Header className="d-flex d-flex fw-bold justify-content-between">
        !!
      </Toast.Header>
      <Toast.Body className="fw-bold text-light">
        {props.errorMessage}
      </Toast.Body>
    </Toast>
  );
};

export default ErrorMessage;
