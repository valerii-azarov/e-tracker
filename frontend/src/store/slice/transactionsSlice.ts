import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../.";
import { Transaction } from "../../interfaces/transaction-interface";
import transactionsApi from "../../api/transactionsApi";

interface TransactionsState {
  data: Transaction;
}

const initialState: TransactionsState = {
  data: {},
};

export const loadTransactions = createAsyncThunk(
  "transactions/loadTransactions",
  async (_, { getState }) => {
    const token = (getState() as RootState).auth.token as string;
    return await transactionsApi.loadTransactions(token);
  }
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadTransactions.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const { } = transactionsSlice.actions;
export default transactionsSlice.reducer;
