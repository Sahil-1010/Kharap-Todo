import React, { useEffect, useState } from 'react';
import './todo.css';
import { toast } from 'react-toastify';
import axios from 'axios';
const Update = ({ display, update }) => {

  useEffect(() => {
    setInput({title: update.title, body: update.body});
  }, [update]);
  const [input, setInput] = useState({title: "", body: ""} );
  const change=(e)=>{
    const {name, value}=e.target;
    setInput({...input, [name]:value});
  }

  const submit= async()=>{
    await axios
    .put(`${window.location.origin}/api/v2/updateTask/${update._id}`,input)
    .then((res)=>{
      // console.log(res);
      toast.success('Task Changed Successfully 😁');
    });
    // console.log(input);
    display('none');
  }

  return (
    <div className="todo-main p-5 update-modal">
      <h2 className="update-txt mb-4">Update Your Task</h2>

      <div className="todo-inputs">
        <input
          type="text"
          name="title"
          className="title-input"
          placeholder="Title"
          value={input.title}
          onChange={change}
        />

        <textarea
          name="body"
          className="title-input"
          placeholder="Description"
          value={input.body}
          onChange={change}
        />

        <div className="btns d-flex justify-content-around align-items-center mt-4">
          <button className="btn btn-success" onClick={submit}>
            Update
          </button>

          <button className="btn btn-danger" onClick={() => display('none')}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Update;
