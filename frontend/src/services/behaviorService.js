import axios from 'axios';

const API_URL = 'http://localhost:5000/api/behaviors';

const getTopBehaviors = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/top`, config);
  return response.data;
};

const getBehaviors = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

const createBehavior = async (behaviorData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, behaviorData, config);
  return response.data;
};

const deleteBehavior = async (behaviorId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}/${behaviorId}`, config);
  return response.data;
};

export { getTopBehaviors, getBehaviors, createBehavior, deleteBehavior };