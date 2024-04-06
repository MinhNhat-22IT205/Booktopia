let activeUser = {
  id: null,
  ava: null,
  email: null,
  username: null,
  password: null,
  cart: [],
  orders: [],
  yourProduct: [],
};
// for (const propName in activeUser) {
//   Object.defineProperty(activeUser, propName, {
//     get() {
//       return this[`${propName}`];
//     },
//     set(value) {
//       this[`${propName}`] = value;
//     },
//   });

//   activeUser[`${propName}`] = activeUser[propName];
// }

export default activeUser;
