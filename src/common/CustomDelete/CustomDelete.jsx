import React from 'react';
import './CustomDelete.css';

export const CustomDelete = ({ title, onClick }) => {
  return (
    <div className="linkAdmin" onClick={onClick}>
      {title}
    </div>
  );
};
