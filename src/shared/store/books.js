import { createSlice } from "@reduxjs/toolkit";
// import bookData from "../dt/BookData"

let initialState = [];
const bookSlice = createSlice({
  name: "books",
  initialState: initialState,
  reducers: {
    addBook(state, action) {
      const newBook = action.payload;
      state.push(newBook);
    },
    removeBook(state, action) {
      const id = action.payload;
      const index = state.findIndex((item) => item.id === id);
      state.splice(index, 1);
    },
    replaceBookStore(state, action) {
      return action.payload;
    },
    updateBook(state, action) {
      const newBook = action.payload;
      const index = state.findIndex((item) => item.id === newBook.id);
      state[index] = newBook;
    },
  },
});

export const sendBookData = (books) => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        `https://fir-a28ea-default-rtdb.firebaseio.com/books.json`,
        {
          method: "PUT",
          body: JSON.stringify(books),
        }
      );
      const resData = await res.json();
      console.log(resData);
      if (!res.ok) {
        throw new Error(resData.error);
      }
    } catch (er) {
      console.log(er);
    }
  };
};

export const getBookData = () => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        `https://fir-a28ea-default-rtdb.firebaseio.com/books.json`
      );
      const resData = await res.json();
      console.log(resData);
      if (!res.ok) {
        throw new Error(resData.error);
      }
      dispatch(bookAction.replaceBookStore(resData));
    } catch (er) {
      console.log(er);
    }
  };
};

export const bookAction = bookSlice.actions;
export default bookSlice.reducer;
