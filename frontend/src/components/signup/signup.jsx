import React, { useState } from 'react';
import './signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Signup = () => {
  const history=useNavigate();
  const [input, setInput] = useState({
    email: '',
    username: '',
    password: '',
  });

  const change = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    await axios.post(`${window.location.origin}/api/v1/register`,input).then((res)=>{
      console.log(res);
      if(res.data.message==="already registered"){
        alert(res.data.message);
      }else{
      alert(res.data.message);
      setInput({
      email: '',
      username: '',
      password: '',
       });
    history('/login');
    }});
    // console.log(input);
    // TODO: Add signup logic here (API call)
    
   
  };

  return (
    <div className="signup-page d-flex justify-content-center align-items-center">
      <div className="signup-card">
        <h2 className="text-center mb-4">Create Account ✨</h2>

        <form onSubmit={submit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={input.username}
              onChange={change}
              required
            />
          </div>

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
              autoComplete="email"
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
              autoComplete="new-password"
            />
          </div>

          <button type="submit" className="signup-btn">
            Sign Up
          </button>

          <p className="text-muted mt-3 text-center">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
