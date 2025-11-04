import React from 'react';
import './Navbar.css';
import { GiBurningBook  } from "react-icons/gi";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
 
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand" to="/"><b><GiBurningBook/> ToDo</b></Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link active btn-nav" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link active btn-nav" to="/todo">To-Do</Link></li>
          {!isLoggedIn && (<>
              <li className="nav-item"><Link className="nav-link active btn-nav" to="/Signup">Sign Up</Link></li>
              <li className="nav-item"><Link className="nav-link active btn-nav" to="/login">Sign In</Link></li>
          </>)}
          {isLoggedIn && (
             <li className="nav-item user-png"> <Link className="nav-link active id" to="/profile">
              <img
                src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80"
                alt="profile_image"
              /></Link>
            </li>
          )}
           
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
