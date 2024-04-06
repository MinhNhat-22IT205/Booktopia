import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: { message: "", status: "" },
  reducers: {
    notify(state, action) {
      state.message = action.payload.message;
      state.status = action.payload.status;
    },
    clearNotify(state) {
      state.message = "";
      state.status = "";
    },
  },
});

export const notificationAction = notificationSlice.actions;
export default notificationSlice.reducer;
