export default function Signup() {
  return (
    <div className="signup-box">
      <div className="signup-form">
        <div>
          <h2 className="!text-3xl">Sign up</h2>
          <p className="!mx-auto opacity-50 mt-2 w-fit">Join us now!</p>
          <div className="inputBox !mt-6">
            <input type="text" required="required"></input>
            <span>Username</span>
            <i></i>
          </div>
          <div className="inputBox !mt-6">
            <input type="text" required="required"></input>
            <span>Email</span>
            <i></i>
          </div>
          <div className="inputBox !mt-6">
            <input type="text" required="required"></input>
            <span>Password</span>
            <i></i>
          </div>
          <div className="inputBox !mt-6">
            <input type="text" required="required"></input>
            <span>Repeat password</span>
            <i></i>
          </div>
          <div className="flex items-center">
            <input type="checkbox" className="w-4 h-4"></input>
            <p className="text-sm ml-2 opacity-50 w-3/4 mt-2">
              I agree with the terms of use and privacy policy
            </p>
          </div>
          <input className="!mt-5" type="submit" value={"Sign up"}></input>
        </div>
        {/* <img
          alt="hey"
          src="https://th.bing.com/th/id/OIG.XsRyEamvAiydiYl1d_cj?pid=ImgGn"
        ></img> */}
      </div>
    </div>
  );
}
