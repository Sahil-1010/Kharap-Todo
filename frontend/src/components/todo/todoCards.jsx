import React from 'react';
import { AiTwotoneDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import './todo.css';

const TodoCards = ({ title, body, id, delid, editid ,updateid, toBeUpdated}) => {
  return (
    <div className="todoCard p-3 shadow-sm rounded">
      <div>
        <h5 className="fw-bold mb-2">{title}</h5>
        <p className="mt-2 text-muted">
          {body.length > 70 ? body.slice(0, 70) + "..." : body}
        </p>
      </div>

      <div className="d-flex justify-content-around align-items-center mt-3">
        <button
          className="btn btn-sm btn-primary d-flex align-items-center gap-1"
          onClick={() => {
            editid(id);
            toBeUpdated(updateid);
          }}
        >
          <FaEdit /> Edit
        </button>

        <button
          className="btn btn-sm btn-danger d-flex align-items-center gap-1"
          onClick={() => delid(id)}
        >
          <AiTwotoneDelete /> Delete
        </button>
      </div>
    </div>
  );
};

export default TodoCards;
