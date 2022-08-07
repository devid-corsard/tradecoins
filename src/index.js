import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import state from './state/state';
/*
import Model from './components/Model.js';
import View from './components/View.js';
import Controller from './components/Controller.js';
import config from './components/config.js';
*/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App state={state} />
  </React.StrictMode>
);
