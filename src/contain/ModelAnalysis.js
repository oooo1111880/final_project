import React, { Component }  from 'react';
import { NavLink, Link } from 'react-router-dom';
import './../Css/ModelAnalysis.css';

import { Route, Routes, Outlet } from 'react-router-dom';

const ModelAnalysis=()=>{
    return (
        <div className="patient-list">
          <div className="breadcrumb">
            <span>
              <Link to="/Home">首頁</Link>
            </span>
            <span>
              {' > '}
              <Link to="/ModelAnalysis/CNN">模型分析</Link>
            </span>
          </div>
          <div className="app">
            <div className="main-wrap">
                <nav className="nav">
                  <h1 className="logo">模型分析結果&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h1>
                  <ul className="nav-list">
                    <li><NavLink to="CNN">CNN</NavLink></li>
                    <li><NavLink to="LSTM">LSTM</NavLink></li>
                  </ul>
                </nav>
                <main className="main">
                  <Outlet />
                </main>
            </div>
          </div>
        </div>
    );
}

export default ModelAnalysis;