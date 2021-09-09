import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import RouteManager from "./routes";
import './App.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <RouteManager />
  </BrowserRouter>
  </React.StrictMode>
  ,
  document.getElementById('root')
);


reportWebVitals();
