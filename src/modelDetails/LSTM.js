import React, { Component } from "react";
import { Link } from 'react-router-dom';
import LSTM_ROC from "./../Css/picture/LSTM_ROC.png";
import LSTM_PRC from "./../Css/picture/LSTM_PRC.png";

const LSTM=()=>{
  return (
    <div class="box">
      <div>
        <h2 class="heading">ROC曲線</h2>
        <img src={LSTM_ROC} alt="LSTM ROC Curve" />

        <h2>PRC曲線</h2>
        <img src={LSTM_PRC} alt="LSTM PRC Curve" />
      </div>
    </div>
  );
}
//<Link to="/Model">test</Link>
export default LSTM;