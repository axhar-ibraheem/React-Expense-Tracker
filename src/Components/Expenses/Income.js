
import { Form, Button } from "react-bootstrap";
import { addIncome } from "../../store/expensesSlice";
import { useDispatch } from "react-redux";
import useInput from "../../hooks/useInput";
const Income = () => {
  const dispatch = useDispatch();
  const [enteredIncome, incomeInputChangeHandler, resetIncomeState] =
    useInput();
  const onSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(addIncome(+enteredIncome));
    resetIncomeState()
  };

  return (
    <Form onSubmit={onSubmitHandler} className="shadow rounded p-4">
      <Form.Group className="mb-2 mb-lg-0" controlId="formGridIncome">
        <Form.Label className="fw-bold fs-6">Income</Form.Label>
        <Form.Control
          type="number"
          min={0}
          required
          value={enteredIncome}
          onChange={incomeInputChangeHandler}
        />
      </Form.Group>
      <Button type="submit" variant="dark mt-4">
        Add Income
      </Button>
    </Form>
  );
};

export default Income;
