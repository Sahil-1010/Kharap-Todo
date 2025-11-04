import React, { useEffect } from 'react';
import './Home.css';
import { GiBurningBook } from "react-icons/gi";
import { Link } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Home = () => {
  // useEffect(() => {
  //   // const fetchUsername = async () => {
  //   //   const id = sessionStorage.getItem('id');
  //   //   if (!id) return; // not logged in

  //   //   try {
  //   //     const res = await axios.get(`${window.location.origin}/api/v2/getUser/${id}`);
  //   //     if (res.data && res.data.user) {
  //   //       const username = res.data.user.username;
  //   //       // sessionStorage.setItem('username', username);

  //   //       toast.success(`Welcome back, ${username}!`, {
  //   //         position: 'top-center',
  //   //         autoClose: 2000,
  //   //         theme: 'colored'
  //   //       });
  //   //     }
  //   //   } catch (err) {
  //   //     console.error('Error fetching username:', err);
  //   //   }
  //   // };

  //   // fetchUsername();
  // }, []);

  return (
    <div className="home d-flex justify-content-center align-items-center">
      <div className="container d-flex justify-content-center align-items-center flex-column">
        <h1><GiBurningBook /> Keep your task ready</h1>
        <p>Create and manage your tasks easily</p>
        <Link className="home-btn" to="/todo">Create Now</Link>
      </div>
    </div>
  );
};

export default Home;
