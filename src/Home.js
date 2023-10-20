import React from 'react';
import { Link } from 'react-router-dom';
import Model from './Model'; // 假設 Model.js 是你的模型頁面組件
import './Home.css';

function Home() {
  return (
    <div className="app-container">
      <Link to="/ModelAnalysis/CNN" className="enter-button">模型分析</Link>
      <Link to="/PatientList" className="enter-button">病患資料</Link>
    </div>
  );
}

export default Home;