import React, { useState } from 'react';

const BehaviorForm = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name });
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} className="behavior-form">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter behavior name"
        required
      />
      <button type="submit">Add Behavior</button>
    </form>
  );
};

export default BehaviorForm;