import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slice/authSlice";
import transactionsSlice from "./slice/transactionsSlice";
import categoriesSilce from "./slice/categoriesSlice";
import messageSlice from "./slice/messageSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    categories: categoriesSilce,
    transactions: transactionsSlice,
    message: messageSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
