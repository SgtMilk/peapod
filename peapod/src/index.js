/*
 * Copyright (C) 2020 Alix Routhier-Lalonde, Adam Di Re, Ricky Liu
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from "redux";
import reportWebVitals from './reportWebVitals';

//ACTIONS

const setUser = (username) => {
  return {
    type: "SETUSER",
    username: username,
  };
};

const setPods = (pods) => {
  return {
    type: "SETPODS",
    pods: pods,
  };
};

const setActivities = (activities) => {
  return {
    type: "SETACTIVITIES",
    activities: activities,
  };
};

//REDUCER
const curuser = (state, action) => {
  if (action.type === "SETUSER")
    return {
      username: action.username,
      pods: [],
      activities: [],
    };
  else if (action.type === "SETPODS")
    return {
      username: action.username,
      pods: action.pods,
      activities: action.activities,
    };
  else {
      return {
        username: action.username,
        pods: action.pods,
        activities: action.activities,
      };
    }
};

let store = createStore(curuser);

//DISPATCH
export default { store, setUser, setPods, setActivities };

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
