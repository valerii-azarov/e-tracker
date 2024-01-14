import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuth: boolean;
  token: string | null;
}

const initialState: AuthState = {
  isAuth: false,
  token: localStorage.getItem("accessToken") ?? null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register: (state) => {
      state.isAuth = false;
    },
    login: (state) => {
      state.isAuth = true;
    },
    logout: (state) => {
      state.isAuth = false;
    },
    refreshToken: (state, action: PayloadAction<string>) => {
      state.isAuth = true;
      state.token = action.payload;
    },
  },
});

export const { register, login, logout, refreshToken } = authSlice.actions;
export default authSlice.reducer;
