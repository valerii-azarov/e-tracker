import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type MessageType = "success" | "error";

interface MessageState {
  message: string | null;
  type: MessageType | null;
}

const initialState: MessageState = {
  message: null,
  type: null,
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<MessageState>) => {
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
    clearMessage: (state) => {
      state.type = null;
      state.message = null;
    },
  },
});

export const { setMessage, clearMessage } = messageSlice.actions;
export default messageSlice.reducer;
