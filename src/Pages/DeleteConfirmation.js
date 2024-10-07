import React from 'react';

const DeleteConfirmation = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div className="overlay--content">
        <h2>Confirm Action</h2>
        <p>{message}</p>
        <button onClick={onConfirm}>Yes, Delete</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
