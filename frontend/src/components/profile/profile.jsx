import React, { useEffect, useState } from 'react';
import './profile.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store';
import { toast } from 'react-toastify';

const Profile = () => {
  const [user, setUser] = useState({ username: '', email: '' });
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();

  // 🔑 get id from sessionStorage
  const id = sessionStorage.getItem('id');

  // 🚀 Fetch user details on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!id) {
          toast.warn('Please log in first 😶');
          return;
        }

        const res = await axios.get(`${window.location.origin}/api/v2/getUser/${id}`);
        if (res.data && res.data.user) {
          setUser({
            username: res.data.user.username,
            email: res.data.user.email,
          });
        } else {
          toast.error('User not found 😢');
        }
      } catch (err) {
        console.error(err);
        toast.error('Error fetching user details 😬');
      }
    };

    fetchUser();
  }, [id]);

  // 🚪 Logout
  const logout = () => {
    dispatch(authActions.logout());
    sessionStorage.removeItem('id');
    toast.info('Logged out successfully 👋');
    window.location.href = '/';
  };

  return (
    <div className="profile d-flex justify-content-center align-items-center">
      <div className="profile-card text-center p-4 shadow-lg rounded-4">
        {isLoggedIn && id ? (
          <>
            <h2>👤 {user.username || 'Loading...'}</h2>
            <p className="email text-muted">{user.email || 'Loading...'}</p>
            <button className="logout-btn btn btn-danger mt-3" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <h3>Please log in to view your profile 😅</h3>
            <Link to="/">
              <button className="btn btn-primary mt-3">Go to Login</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
