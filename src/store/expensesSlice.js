import { createSlice } from "@reduxjs/toolkit";

const initialExpensesState = {
  expenses: [],
  premium: false,
  isLoading: true,
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
    activatePremium: (state) => {
      state.premium = true;
    },
    setIsLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export default expensesSlice.reducer;
export const { addExpense, deleteExpense, activatePremium, setIsLoading } =
  expensesSlice.actions;
