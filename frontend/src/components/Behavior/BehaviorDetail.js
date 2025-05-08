import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../../services/todoService';
import AuthContext from '../../context/AuthContext';
import TodoItem from '../Todo/TodoItem';
import TodoForm from '../Todo/TodoForm';

const BehaviorDetail = () => {
  const { behaviorId } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todosData = await getTodos(behaviorId, token);
        setTodos(todosData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTodos();
  }, [behaviorId, token]);

  const handleAddTodo = async (text) => {
    try {
      const newTodo = await createTodo(behaviorId, { text }, token);
      setTodos([...todos, newTodo]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateTodo = async (id, updatedTodo) => {
    try {
      await updateTodo(id, updatedTodo, token);
      setTodos(
        todos.map((todo) => (todo._id === id ? { ...todo, ...updatedTodo } : todo))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id, token);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="behavior-detail">
      <button onClick={() => navigate(-1)} className="btn btn-back">
        Back
      </button>
      <h2>Behavior Details</h2>
      <TodoForm onSubmit={handleAddTodo} />
      <div className="todos-list">
        {todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onUpdate={handleUpdateTodo}
            onDelete={handleDeleteTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default BehaviorDetail;