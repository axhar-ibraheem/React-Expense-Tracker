import { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { addIncome } from "../../store/expensesSlice";
import { useDispatch, useSelector } from "react-redux";

const Income = () => {
  const incomeRef = useRef();
  const dispatch = useDispatch();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const income = +incomeRef.current.value;
    dispatch(addIncome(income));
  };

  return (
    <Form onSubmit={onSubmitHandler} className="shadow rounded p-4 bg-info">
      <Form.Group className="mb-2 mb-lg-0" controlId="formGridIncome">
        <Form.Label className="fw-bold fs-6 text-dark">Income</Form.Label>
        <Form.Control ref={incomeRef} type="number" min={0} required />
      </Form.Group>
      <Button type="submit" variant="dark mt-4">
        Add Income
      </Button>
    </Form>
  );
};

export default Income;
