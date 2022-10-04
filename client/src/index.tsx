import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//@ts-ignore
import Navigation from './Navigation.js';



const root = ReactDOM.createRoot(
  document.getElementById("root")! //*********/
);
root.render(
  <Navigation/>
);