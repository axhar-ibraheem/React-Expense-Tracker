import { createSlice } from "@reduxjs/toolkit";

const initialExpensesState = {
  expenses: [],
};
const expensesSlice = createSlice({
  name: "expenses",
  initialState: initialExpensesState,
  reducers: {
    addExpense: (state, action) => {
      const { expenseItem } = action.payload;
      state.expenses.push(...expenseItem);
    },
    deleteExpense: (state, action) => {
      const { id } = action.payload;
      state.expenses = state.expenses.filter((item) => item.id !== id);
    },
  },
});

export default expensesSlice.reducer;
export const { addExpense, deleteExpense } = expensesSlice.actions;
