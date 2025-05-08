import React, { useState } from 'react';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  const handleUpdate = () => {
    onUpdate(todo._id, { text });
    setIsEditing(false);
  };

  return (
    <div className="todo-item">
      {isEditing ? (
        <>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <span
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          >
            {todo.text}
          </span>
          <div className="todo-actions">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete(todo._id)}>Delete</button>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onUpdate(todo._id, { completed: !todo.completed })}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem;