import React, { useEffect } from 'react';
import './App.css';
import Navbar from './navbar/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './home/home';
import Footer from './footer/Footer';
import Profile from './profile/profile';
import Signup from './signup/signup';
import Login from './signup/signin';
import Todo from './todo/todo';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../store';

const App = () => {
  const dispatch=useDispatch();
  useEffect(() => {
   const id=sessionStorage.getItem("id");
    if(id){
         dispatch(authActions.login());
    }
  }, []);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        {/* <ToastContainer /> */}
        <Route exact path="/profile" element={<Profile />} />
         <Route exact path="/todo" element={<Todo />} />
          <Route exact path="/signup" element={<Signup />} />
           <Route exact path="/Login" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
