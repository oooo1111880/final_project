import React, { Component } from "react";
import { Link } from 'react-router-dom';
import CNN_ROC from "./../Css/picture/CNN_ROC.png";
import CNN_PRC from "./../Css/picture/CNN_PRC.png";

const CNN=()=>{
  return (
    <div class="box">
      <div>
        <h2 class="heading">ROC曲線</h2>
        <img src={CNN_ROC} alt="CNN ROC Curve" />

        <h2>PRC曲線</h2>
        <img src={CNN_PRC} alt="CNN PRC Curve" />
      </div>
    </div>
  );
}
//<Link to="/Model">test</Link>
export default CNN;