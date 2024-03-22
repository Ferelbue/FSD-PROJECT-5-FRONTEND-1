import React from 'react';
import './CustomDelete.css';

export const CustomDelete = ({ title, onClick }) => {
  return (
    <div className="likeDesign" onClick={onClick}>
      {title}
    </div>
  );
};
