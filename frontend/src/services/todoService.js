import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const getTodos = async (behaviorId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/${behaviorId}/todos`, config);
  return response.data;
};

const createTodo = async (behaviorId, todoData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    `${API_URL}/${behaviorId}/todos`,
    todoData,
    config
  );
  return response.data;
};

const updateTodo = async (todoId, todoData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_URL}/todos/${todoId}`, todoData, config);
  return response.data;
};

const deleteTodo = async (todoId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}/todos/${todoId}`, config);
  return response.data;
};

export { getTodos, createTodo, updateTodo, deleteTodo };