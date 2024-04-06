import { createSlice } from "@reduxjs/toolkit";
import { notificationAction } from "./notification";

const initialState = {
  uid: "",
  token: null,
  avatar: null,
  username: "",
  cart: { items: [], totalAmount: 0 },
  tokenExpireDate: null,
  coverImage: null,
  bio: null,
  address: null,
  email: null,
  contactNumber: null,
  registerDate: null,
  totalBookSold: 0,
  isAdmin: null,
  totalEarned: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    login(state, action) {
      const user = action.payload;
      state.uid = user.uid;
      state.token = user.token;
      state.username = user.username;
      state.avatar = user.avatar;
      state.cart = user.cart;
      state.coverImage = user.coverImage;
      state.bio = user.bio;
      state.email = user.email;
      state.address = user.address;
      state.contactNumber = user.contactNumber;
      state.registerDate = user.registerDate;
      state.totalBookSold = user.totalBookSold;
      state.totalEarned = user.totalEarned;
      state.isAdmin = user.isAdmin;
      if (!state.cart) {
        state.cart = { items: [], totalAmount: 0 };
      }
      state.tokenExpireDate = user.tokenExpireDate;
      // state.orders = user.orders;
      // if (!state.orders) {
      //   state.orders = [];
      // }
      // state.yourProduct = user.yourProduct;
      // if (!state.yourProduct) {
      //   state.yourProduct = [];
      // }
      localStorage.setItem(
        "userData",
        JSON.stringify({
          uid: user.uid,
          token: user.token,
          tokenExpireDate: user.tokenExpireDate,
        })
      );
    },
    logout(state) {
      localStorage.removeItem("userData");
      return initialState;
    },
    updateUser(state, action) {
      const user = action.payload;
      state.username = user.username;
      state.avatar = user.avatar;
      if (user.coverImage) state.coverImage = user.coverImage;
      state.bio = user.bio;
      state.address = user.address;
      state.contactNumber = user.contactNumber;
    },
    addCartItem(state, action) {
      const book = action.payload;
      const aBookAllOverPrice =
        book.quantity * (book.price - book.price * (book.discount / 100));
      const index = state.cart.items.findIndex(
        (item) => item.book.id === book.id
      );
      const existItem = state.cart.items[index];
      if (existItem) {
        if (book.quantity + existItem.quantity > book.numberInStock) {
          console.log("num" + book.numberInStock);
          return;
        }
        existItem.quantity += book.quantity;
        state.cart.totalAmount += aBookAllOverPrice;
      } else {
        const { quantity, ...bookData } = book;
        state.cart.items.push({ book: bookData, quantity: quantity });
        state.cart.totalAmount += aBookAllOverPrice;
      }
    },
    removeCartItem(state, action) {
      const removeItem = action.payload;
      const index = state.cart.items.findIndex(
        (item) => item.book.id === removeItem.id
      );
      const existItem = state.cart.items[index];
      if (existItem) {
        state.cart.items.splice(index, 1);
        state.cart.totalAmount -=
          existItem.quantity *
          (existItem.book.price -
            existItem.book.price * (existItem.book.discount / 100));
      }
    },
    reduceCartItemAmount(state, action) {
      const reduceItem = action.payload;
      console.log(reduceItem.quantity);
      const aBookAllOverPrice =
        (reduceItem.price - reduceItem.price * (reduceItem.discount / 100)) *
        reduceItem.quantity;
      const index = state.cart.items.findIndex(
        (item) => item.book.id === reduceItem.id
      );
      const existItem = state.cart.items[index];
      let amountAfter = existItem.quantity - reduceItem.quantity;
      if (amountAfter <= 0) {
        state.cart.items.splice(index, 1);
      } else {
        existItem.quantity = amountAfter;
      }
      state.cart.totalAmount -= aBookAllOverPrice;
    },
    clearCart(state, action) {
      state.cart = { items: [], totalAmount: 0 };
    },
  },
});
//`https://fir-a28ea-default-rtdb.firebaseio.com/users/${user.uid}.json`,
export const sendCart = (uid, cart, token) => {
  return (dispatch) => {
    (async () => {
      console.log(cart);
      const storeUserDataResponse = await fetch(
        `http://localhost:5000/cart/${uid}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: uid,
            items: cart.items.map((item) => {
              return { book: item.book.id, quantity: item.quantity };
            }),
            totalAmount: cart.totalAmount,
          }),
        }
      );
      if (!storeUserDataResponse.ok) {
        const error = await storeUserDataResponse.json();
        console.log(error);
        throw new Error("Sth go wrong");
      }
    })().catch((er) => {
      console.log(er);
    });
  };
};

export const exportProduct = (uid, iid, token, setIsLoading, setData) => {
  return (dispatch) => {
    (async () => {
      setIsLoading(true);
      const res = await fetch(`http://localhost:5000/orders/export/${iid}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: uid,
        }),
      });
      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.message);
      }
      setIsLoading(false);
      dispatch(
        notificationAction.notify({
          message: "Item exported!",
          status: "success",
        })
      );
      setData((prev) =>
        prev.map((item) => {
          if (item.id === iid) item.status = "Completed";
          return item;
        })
      );
      // window.location.reload();
    })().catch((er) => {
      setIsLoading(false);
      console.log(er);
      dispatch(
        notificationAction.notify({
          message: er.message,
          status: "error",
        })
      );
    });
  };
};

export const checkout = (data, uid, token, setIsLoading) => {
  return (dispatch) => {
    (async () => {
      setIsLoading(true);
      const res = await fetch(`http://localhost:5000/cart/${uid}/checkout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          deliveryAddress: data.deliveryAddress,
          receiverName: data.receiverName,
          phoneNumber: data.phoneNumber,
        }),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
      dispatch(userAction.clearCart());
      setIsLoading(false);
      dispatch(
        notificationAction.notify({
          message: "Ordered",
          status: "success",
        })
      );
    })().catch((er) => {
      setIsLoading(false);
      console.log(er);
      dispatch(
        notificationAction.notify({
          message: er.message,
          status: "error",
        })
      );
    });
  };
};

export const updateUser = (uid, data, token, setIsLoading) => {
  return (dispatch) => {
    (async () => {
      const formData = new FormData();
      for (const prop in data) {
        if (Array.isArray(data[prop])) {
          for (const value of data[prop]) {
            formData.append(`${prop}[]`, value);
          }
        } else {
          formData.append(prop, data[prop]);
        }
      }
      setIsLoading(true);
      const res = await fetch(`http://localhost:5000/users/${uid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "PATCH",
        body: formData,
      });
      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.message);
      }
      dispatch(
        notificationAction.notify({
          message: "Updated successfully!",
          status: "success",
        })
      );
      dispatch(
        userAction.updateUser({
          username: resData.user.username,
          avatar: resData.user.avatar,
          bio: resData.user.bio,
          address: resData.user.address,
          contactNumber: resData.user.contactNumber,
        })
      );
      setIsLoading(false);
    })().catch((er) => {
      setIsLoading(false);
      console.log(er.message);
      dispatch(
        notificationAction.notify({
          message: er.message,
          status: "error",
        })
      );
    });
  };
};
export const uploadCover = (uid, data, token, setIsLoading) => {
  return (dispatch) => {
    (async () => {
      const formData = new FormData();
      for (const prop in data) {
        if (Array.isArray(data[prop])) {
          for (const value of data[prop]) {
            formData.append(`${prop}[]`, value);
          }
        } else {
          formData.append(prop, data[prop]);
        }
      }
      setIsLoading(true);
      const res = await fetch(`http://localhost:5000/users/${uid}/cover`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "PATCH",
        body: formData,
      });
      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.message);
      }
      dispatch(
        notificationAction.notify({
          message: "Upload successfully!",
          status: "success",
        })
      );
      dispatch(
        userAction.updateUser({
          username: resData.user.username,
          avatar: resData.user.avatar,
          coverImage: resData.user.coverImage,
          bio: resData.user.bio,
          address: resData.user.address,
          contactNumber: resData.user.contactNumber,
        })
      );
      setIsLoading(false);
    })().catch((er) => {
      setIsLoading(false);
      console.log(er.message);
      dispatch(
        notificationAction.notify({
          message: er.message,
          status: "error",
        })
      );
    });
  };
};
export const updateBook = (bid, data, token, setIsLoading, redirect) => {
  return (dispatch) => {
    (async () => {
      const formData = new FormData();
      for (const prop in data) {
        if (Array.isArray(data[prop])) {
          for (const value of data[prop]) {
            formData.append(`${prop}[]`, value);
          }
        } else {
          formData.append(prop, data[prop]);
        }
      }
      setIsLoading(true);
      const res = await fetch(`http://localhost:5000/books/${bid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "PATCH",
        body: formData,
      });
      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.message);
      }
      dispatch(
        notificationAction.notify({
          message: "Updated successfully!",
          status: "success",
        })
      );
      setIsLoading(false);
      // redirect();
    })().catch((er) => {
      setIsLoading(false);
      console.log(er.message);
      dispatch(
        notificationAction.notify({
          message: er.message,
          status: "error",
        })
      );
    });
  };
};

export const createBook = (data, token, setIsLoading) => {
  return (dispatch) => {
    (async () => {
      const formData = new FormData();
      for (const prop in data) {
        if (Array.isArray(data[prop])) {
          for (const value of data[prop]) {
            formData.append(`${prop}[]`, value);
          }
        } else {
          formData.append(prop, data[prop]);
        }
      }
      setIsLoading(true);
      const res = await fetch("http://localhost:5000/books", {
        headers: { Authorization: `Bearer ${token}` },
        method: "POST",
        body: formData,
      });
      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.message);
      }
      dispatch(
        notificationAction.notify({
          message: "Book created!",
          status: "success",
        })
      );
      setIsLoading(false);
    })().catch((er) => {
      setIsLoading(false);
      console.log(er.message);
      dispatch(
        notificationAction.notify({
          message: er.message,
          status: "error",
        })
      );
    });
  };
};
export const createReview = (bid, data, token, setIsLoading, setFlag) => {
  return (dispatch) => {
    (async () => {
      setIsLoading(true);
      const res = await fetch(`http://localhost:5000/reviews/${bid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.message);
      }
      dispatch(
        notificationAction.notify({
          message: "Review posted!",
          status: "success",
        })
      );
      setIsLoading(false);
      setFlag((prev) => !prev);
    })().catch((er) => {
      setIsLoading(false);
      console.log(er.message);
      dispatch(
        notificationAction.notify({
          message: er.message,
          status: "error",
        })
      );
    });
  };
};

export const getUser = (uid, token, tokenExpireDate, nav) => {
  return (dispatch) => {
    (async () => {
      const dataRes = await fetch(`http://localhost:5000/users/${uid}`);
      const userData = await dataRes.json();
      if (!dataRes.ok) {
        throw new Error(userData.error);
      }
      console.log(userData);
      dispatch(
        userAction.login({
          uid: uid,
          token: token,
          avatar: userData.user.avatar,
          username: userData.user.username,
          cart: userData.user.cart,
          email: userData.user.email,
          coverImage: userData.user.coverImage,
          bio: userData.user.bio,
          address: userData.user.address,
          contactNumber: userData.user.contactNumber,
          registerDate: userData.user.registerDate,
          totalBookSold: userData.user.totalBookSold,
          totalEarned: userData.user.totalEarned,
          isAdmin: userData.user.isAdmin,
          tokenExpireDate,
        })
      );
      if (userData.user.isAdmin) nav("/dashboard");
    })().catch((er) => {
      console.log(er.message);
      dispatch(
        notificationAction.notify({
          message: er.message,
          status: "error",
        })
      );
    });
  };
};

export const login = (data, setIsLoading, onClose, nav) => {
  return (dispatch) => {
    (async () => {
      console.log(data);
      setIsLoading(true);
      const res = await fetch("http://localhost:5000/users/login", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });
      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.message);
      }
      const uid = resData.user.id;
      const token = resData.accessToken;
      dispatch(
        userAction.login({
          uid,
          token,
          avatar: resData.user.avatar,
          username: resData.user.username,
          coverImage: resData.user.coverImage,
          email: resData.user.email,
          bio: resData.user.bio,
          address: resData.user.address,
          contactNumber: resData.user.contactNumber,
          registerDate: resData.user.registerDate,
          totalBookSold: resData.user.totalBookSold,
          totalEarned: resData.user.totalEarned,
          isAdmin: resData.user.isAdmin,
          cart: resData.user.cart
            ? resData.user.cart
            : { items: [], totalAmount: 0 },
          tokenExpireDate: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
        })
      );
      setIsLoading(false);
      dispatch(
        notificationAction.notify({
          message: "Successfully signed in!",
          status: "success",
        })
      );
      onClose();
      if (resData.user.isAdmin) nav("/dashboard");
    })().catch((er) => {
      setIsLoading(false);
      console.log(er.message);
      dispatch(
        notificationAction.notify({
          message: er.message,
          status: "error",
        })
      );
    });
  };
};

export const signup = (data, setIsLoading, onClose) => {
  return (dispatch) => {
    (async () => {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("avatar", data.avatar);
      if (data.isAdmin === "true" || data.isAdmin === "false") {
        console.log(data.isAdmin + "  asdas ");
        formData.append("isAdmin", data.isAdmin);
      }
      setIsLoading(true);
      const res = await fetch("http://localhost:5000/users/signup", {
        method: "POST",
        body: formData,
      });
      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.message);
      }
      dispatch(
        notificationAction.notify({
          message: "Account created! Please login to use the service",
          status: "success",
        })
      );
      setIsLoading(false);
      onClose();
    })().catch((er) => {
      setIsLoading(false);
      console.log(er.message);
      dispatch(
        notificationAction.notify({
          message: er.message,
          status: "error",
        })
      );
    });
  };
};

export const userAction = userSlice.actions;
export default userSlice.reducer;
