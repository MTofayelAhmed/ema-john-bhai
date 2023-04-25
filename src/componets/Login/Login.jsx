import React, { useContext, useState } from "react";
import "./Login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authContext } from "../Provider/AuthProvider";

const Login = () => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const { SignIn } = useContext(authContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location?.state?.from?.pathname || "/";

  console.log(location);
  const handleSignIn = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    SignIn(email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        form.reset();
        navigate(from);
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  return (
    <div className="form-container">
      <div className="form-title">Login</div>
      <form onSubmit={handleSignIn}>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" required />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type={show ? "text" : 'password'} name="password" id="password" required />
          <p onClick={()=> setShow(!show)}><small>
            {
              show ? <span>Hide password</span>: <span>Show Password</span>
            }
            
            </small></p>
        </div>
        <input className="btn-submit" type="submit" value="submit" />
      </form>
      <span>
        <small>
          New to this website?? <Link to="/signUp"> Sign Up Please</Link>
        </small>
      </span>
    </div>
  );
};

export default Login;
