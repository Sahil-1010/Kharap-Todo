import React, { useEffect, useState } from 'react';
import './todo.css';
import TodoCards from './TodoCards';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Update from './Update';
import axios from 'axios';

let toUpdateArray = [];

const Todo = () => {
  const [active, setActive] = useState(false);
  const [input, setInput] = useState({ title: '', body: '' });
  const [array, setArray] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false);
  const [editId, setEditId] = useState(null);
  const [userId, setUserId] = useState(sessionStorage.getItem("id"));

  // handle change
  const change = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  // Add task
  const submit = async () => {
    if (input.title && input.body) {
      if (userId) {
        try {
          await axios.post(`${window.location.origin}/api/v2/addTask`, {
            title: input.title,
            body: input.body,
            id: userId,
          });
          toast.success('Task Added Successfully 😁');
          setInput({ title: '', body: '' });
          setActive(false);
          fetchTasks(userId); // immediately refresh tasks
        } catch (err) {
          toast.error('Error adding task 😢');
        }
      } else {
        setArray((prev) => [...prev, input]);
        setInput({ title: '', body: '' });
        setActive(false);
        toast.success('Task Added (local only)');
        toast.error('Sign in to save changes!');
      }
    } else {
      toast.warn('Please write something to add 😑');
    }
  };

  // Delete task
// Delete task
const del = async (CardId) => {
  if (userId) {
    try {
      await axios.delete(`${window.location.origin}/api/v2/deleteTask/${CardId}`, {
        data: { id: userId },
      });

      // 🔥 instantly update UI before fetching again
      setArray((prev) => prev.filter((task) => task._id !== CardId));

      toast.success('Task Deleted Successfully 🥱');

      // optional: refresh from backend to stay synced
      setTimeout(() => fetchTasks(userId), 300);
    } catch (err) {
      toast.error('Failed to delete task 😕');
    }
  } else {
    toast.error('Sign in to Delete!');
  }
};


  // Edit handling
  const edit = (id) => {
    setEditId(id);
    setShowUpdate(true);
  };

  const update = (id) => {
    toUpdateArray = array[id];
  };

  // Fetch tasks function
  const fetchTasks = async (uid) => {
    try {
      const res = await axios.get(`${window.location.origin}/api/v2/getTasks/${uid}`);
      setArray(res.data.list || []);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  };

  // 🧠 Detect login change automatically
  useEffect(() => {
    const interval = setInterval(() => {
      const newId = sessionStorage.getItem("id");
      if (newId && newId !== userId) {
        setUserId(newId);
        fetchTasks(newId); // Auto-refresh when user logs in
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [userId]);

  // Initial fetch if logged in
  useEffect(() => {
    if (userId) fetchTasks(userId);
  }, [userId]);

  return (
    <div className="container">
      <ToastContainer />
      <div className="todo-page">
        <div className="todo-main container d-flex flex-column align-items-center">
          {/* Input Section */}
          <div className="todo-inputs w-50">
            <input
              className="title-input"
              name="title"
              value={input.title}
              type="text"
              placeholder="Title"
              onChange={change}
              onFocus={() => setActive(true)}
            />
            <div className={`details ${active ? 'show' : ''}`}>
              <textarea
                placeholder="Description"
                name="body"
                onChange={change}
                value={input.body}
              ></textarea>
              <button className="add-btn" onClick={submit}>Add Task</button>
            </div>
          </div>

          {/* Todo Cards */}
          <div className="todo-cards-container w-75 mt-2">
            <div className="container-fluid">
              <div className="row">
                {array.length > 0 ? (
                  array.map((item, index) => (
                    <div className="col-lg-4 mb-3" key={index}>
                      <TodoCards
                        title={item.title}
                        body={item.body}
                        id={item._id}
                        delid={del}
                        editid={edit}
                        updateid={index}
                        toBeUpdated={update}
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted mt-4">No tasks yet 😴</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Update Modal */}
        {showUpdate && editId !== null && (
          <>
            <div className="update-overlay" onClick={() => setShowUpdate(false)}></div>
            <Update
              update={toUpdateArray}
              display={(value) => setShowUpdate(value === 'block')}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Todo;
