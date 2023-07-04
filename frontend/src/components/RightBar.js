import React from 'react';
import './RightBar.css';

const RightBar = () => {
  return (
    <div className="right-bar">
      <h2 className="genre-heading" style={{textAlign: "center"}} >Genre</h2>
      <div className="button-container">
        <button className="genre-button">Horror</button>
        <button className="genre-button">Thriller</button>
        <button className="genre-button">Comedy</button>
        <button className="genre-button">Dark</button>
        <button className="genre-button">Fantasy</button>
        <button className="genre-button">Novels</button>
      </div>
    </div>
  );
};

export default RightBar;
