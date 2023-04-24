import React, { useContext } from "react";
import "./Header.css";
import logo from "../../images/Logo.svg";
import { Link } from "react-router-dom";
import { authContext } from "../Provider/AuthProvider";

const Header = () => {
  const {logOut, user}= useContext(authContext)
  const handleLogOut = ()=> {
    logOut()
    .then(result=> {

    })
    .catch(error=> {
      console.log(error)
    })
  }
  return (
    <nav className="header">
      <img src={logo} alt="" />
      <div>
        <Link to="/">Shop</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/inventory">Inventory</Link>
        <Link to="/login">Login</Link>
        <Link to="/signUp">Sign Up</Link>
     {
      user && <span className="text-header">Welcome {user.email} <button onClick={handleLogOut}>LogOut</button></span>
     }
      </div>
    </nav>
  );
};

export default Header;
