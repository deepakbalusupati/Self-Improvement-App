import React, { useState, useEffect, useContext } from 'react';
import { getTopBehaviors, createBehavior, deleteBehavior } from '../../services/behaviorService';
import AuthContext from '../../context/AuthContext';
import BehaviorCard from './BehaviorCard';
import BehaviorForm from './BehaviorForm';

const BehaviorList = () => {
  const { token } = useContext(AuthContext);
  const [behaviors, setBehaviors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBehaviors = async () => {
      try {
        const behaviorsData = await getTopBehaviors(token);
        setBehaviors(behaviorsData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchBehaviors();
  }, [token]);

  const handleAddBehavior = async (behaviorData) => {
    try {
      const newBehavior = await createBehavior(behaviorData, token);
      setBehaviors([...behaviors, newBehavior]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteBehavior = async (behaviorId) => {
    try {
      await deleteBehavior(behaviorId, token);
      setBehaviors(behaviors.filter((behavior) => behavior._id !== behaviorId));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="behavior-list">
      <h1>Top Behaviors to Improve</h1>
      <BehaviorForm onSubmit={handleAddBehavior} />
      <div className="behaviors-grid">
        {behaviors.map((behavior) => (
          <BehaviorCard
            key={behavior._id}
            behavior={behavior}
            onDelete={handleDeleteBehavior}
          />
        ))}
      </div>
    </div>
  );
};

export default BehaviorList;