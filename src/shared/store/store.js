import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./books";
import notificationReducer from "./notification";
import userReducer from "./user";

const store = configureStore({
  reducer: {
    books: bookReducer,
    notification: notificationReducer,
    user: userReducer,
  },
});

export default store;
