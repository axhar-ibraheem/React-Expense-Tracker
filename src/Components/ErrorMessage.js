import { Toast } from "react-bootstrap";

const ErrorMessage = (props) => {
  return (
    <Toast
      className="w-100 bg-danger mt-3"
      onClose={() => props.setShow(false)}
      delay={4000}
      autohide
    >
      <Toast.Header className="d-flex fw-bold justify-content-between">
        !!
      </Toast.Header>
      <Toast.Body className="fw-bold">{props.errorMessage}</Toast.Body>
    </Toast>
  );
};

export default ErrorMessage;
