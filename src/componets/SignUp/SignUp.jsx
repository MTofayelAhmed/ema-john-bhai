import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";
import { authContext } from "../Provider/AuthProvider";




const SignUp = () => {
  const [error, setError] = useState("");
  const { createUser } = useContext(authContext);
 
  const handleSignUp = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirm = form.confirm.value;
    console.log(email, password, confirm);

    setError("");
    if (password !== confirm) {
      setError("password did not match");
    } else if (password.length < 6) {
      setError("password must be eight characters");
    }
    createUser(email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        form.reset();
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });


  };
  return (
    <div className="form-container">
      <div className="form-title">Sign Up</div>
      <form onSubmit={handleSignUp}>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="" required />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="" required />
        </div>
        <div className="form-control">
          <label htmlFor="confirm">confirm Password</label>
          <input type="password" name="confirm" id="" required />
        </div>
        <input className="btn-submit" type="submit" value="submit" />
      </form>

      <span>
        <small>
          Already Have an Account?? <Link to="/login"> Login Please</Link>
        </small>
      </span>
      <p className="text-color">
        <small>{error}</small>
      </p>
    </div>
  );
};

export default SignUp;
