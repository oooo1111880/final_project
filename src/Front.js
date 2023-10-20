import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Front() {
  return (
    <div className="app-container">
      <h1 className="app-title">呼吸器相關預測系統</h1>
      <p className="app-description">呼吸器相關醫療事件  多任務機器學習之預測模型</p>
      <Link to="/Home" className="enter-button">進入系統</Link>
    </div>
  );
}

export default Front;