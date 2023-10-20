import React from 'react';
import ReactDOM from 'react-dom/client';

import Home from './Home';
import Front from './Front';

import Model from './Model';

import ModelAnalysis from './contain/ModelAnalysis';
import { PatientDetails, Predict, Data, PredictAndData, StaticData, DynamicData, StaticAndDynamicData } from './contain/PatientDetails';
import PatientList from './contain/PatientList';
import BreadcrumbBar from './BreadcrumbBar';

import CNN from './modelDetails/CNN';
import LSTM from './modelDetails/LSTM';

import reportWebVitals from './reportWebVitals';
import { HashRouter, Route, Routes } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <Routes>
      <Route index element={<Front/>}/>
      <Route path="/" element={<BreadcrumbBar/>}>
        <Route path="Home" element={<Home/>}/>
        <Route path="ModelAnalysis" element={<ModelAnalysis/>}>
            <Route path="CNN" element={<CNN/>}/>
            <Route path="LSTM" element={<LSTM/>}/>
        </Route>
        <Route path="PatientList" element={<PatientList/>}/>
        <Route path="PatientDetails/:stayId" element={<PatientDetails/>}>
            <Route path="PredictAndData" element={<PredictAndData/>}/>
            <Route path="Predict" element={<Predict/>}/>
            <Route path="Data" element={<Data/>}/>
            <Route path="StaticAndDynamicData" element={<StaticAndDynamicData/>}/>
            <Route path="StaticData" element={<StaticData/>}/>
            <Route path="DynamicData" element={<DynamicData/>}/>
        </Route>
        <Route path="Model" element={<Model/>}/>
      </Route>
    </Routes>
  </HashRouter>
);

reportWebVitals();
