import React from 'react';
import { Link } from 'react-router-dom';

const BehaviorCard = ({ behavior, onDelete }) => {
  return (
    <div className="behavior-card">
      <div className="behavior-info">
        <h3>{behavior.name}</h3>
        <p>{behavior.todoCount} improvement items</p>
      </div>
      <div className="behavior-actions">
        <Link to={`/behaviors/${behavior._id}`} className="btn btn-view">
          View
        </Link>
        <button onClick={() => onDelete(behavior._id)} className="btn btn-delete">
          Delete
        </button>
      </div>
    </div>
  );
};

export default BehaviorCard;