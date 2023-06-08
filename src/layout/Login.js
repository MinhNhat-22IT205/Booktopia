import { useRef } from "react";
export default function Login(props) {
  const usernameInput = useRef();
  const passwordInput = useRef();
  function submitHandler(event) {
    event.preventDefault();
    const user = {
      username: usernameInput.current.value,
      password: passwordInput.current.value,
    };
    console.log(user);
  }

  return (
    <div className="login-box" onSubmit={submitHandler}>
      <form className="login-form ">
        <h2 className="!text-3xl">Sign in</h2>
        <p className="mx-auto mt-2 text-base opacity-50">Welcome back!</p>
        <div className="inputBox">
          <input type="text" required ref={usernameInput}></input>
          <span>Email</span>
          <i></i>
        </div>
        <div className="inputBox">
          <input type="text" required ref={passwordInput}></input>
          <span>Password</span>
          <i></i>
        </div>
        <div className="links">
          <a href="google.com">Forgot Password?</a>
        </div>
        <input type="submit" value={"Login"}></input>
      </form>
    </div>
  );
}
