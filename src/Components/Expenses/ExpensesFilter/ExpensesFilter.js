import { ButtonGroup } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import DayPicker from "./DayPicker";
import MonthPicker from "./MonthPicker";
import YearPicker from "./YearPicker";
import {
  selectDay,
  selectMonth,
  selectYear,
} from "../../../store/expensesFilterSlice";
import { filterExpenses } from "../../../store/expensesSlice";
import { useSelector, useDispatch } from "react-redux";
const ExpensesFilter = () => {
  const day = useSelector((state) => state.expenseFilter.day);
  const month = useSelector((state) => state.expenseFilter.month);
  const year = useSelector((state) => state.expenseFilter.year);
  const dispatch = useDispatch();

  const handleDayChange = (date) => {
    dispatch(selectDay({ day: date.toString() }));
    dispatch(filterExpenses({ date: date.toString(), filter: "day" }));
  };

  const handleMonthChange = (date) => {
    dispatch(selectMonth({ month: date.toString() }));
    dispatch(filterExpenses({ date: date.toString(), filter: "month" }));
  };

  const handleYearChange = (date) => {
    dispatch(selectYear({ year: date.toString() }));
    dispatch(filterExpenses({ date: date.toString(), filter: "year" }));
  };

  return (
    <ButtonGroup className="mb-3 d-flex">
      <DayPicker
        selectedDate={day ? new Date(day) : day}
        handleDateChange={handleDayChange}
      />
      <MonthPicker
        selectedDate={month ? new Date(month) : month}
        handleDateChange={handleMonthChange}
      />
      <YearPicker
        selectedDate={year ? new Date(year) : year}
        handleDateChange={handleYearChange}
      />
    </ButtonGroup>
  );
};

export default ExpensesFilter;
