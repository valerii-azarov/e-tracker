import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../.";
import { Category } from "../../interfaces/category-interface";
import categoriesApi from "../../api/categoriesApi";

interface CategoriesState {
  data: Category[];
}

const initialState: CategoriesState = {
  data: [],
};

export const loadCategories = createAsyncThunk(
  "categories/loadCategories",
  async (_, { getState }) => {
    const token = (getState() as RootState).auth.token as string;
    return await categoriesApi.loadCategories(token);
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadCategories.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const { } = categoriesSlice.actions;
export default categoriesSlice.reducer;
