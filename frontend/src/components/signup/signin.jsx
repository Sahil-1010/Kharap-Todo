import React, { useState } from 'react';
import './signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store';
import { Link } from 'react-router-dom';

const Signin = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const change = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${window.location.origin}/api/v1/login`, input);
      sessionStorage.setItem('id', res.data.user._id);
      dispatch(authActions.login());
      history('/');
      setTimeout(() => {
        window.location.reload();
      }, 300);
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed! Please check your credentials.");
    }
  };

  return (
    <div className="signup-page d-flex justify-content-center align-items-center">
      <div className="signup-card">
        <h2 className="text-center mb-4">Welcome Back 👋</h2>

        <form onSubmit={submit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={input.email}
              onChange={change}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={input.password}
              onChange={change}
              required
            />
          </div>

          <button type="submit" className="signup-btn">
            Sign In
          </button>

          <p className="text-muted mt-3 text-center">
            <b>Don’t have an account? &nbsp;</b>
            <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;
