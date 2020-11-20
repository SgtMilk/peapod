/*
 * Copyright (C) 2020 Alix Routhier-Lalonde, Adam Di Re, Ricky Liu
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore } from "redux";

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

const setNotifications = (notifications) => {
  return {
    type: "SETNOTIFICATIONS",
    notifications: notifications,
  };
};

const setPodsActivitiesNotifications = (pods, activities, notifications) => {
  return {
    type: "SETPODSACTIVITIESNOTIFICATIONS",
    pods: pods,
    activities: activities,
    notifications: notifications,
  };
};

//REDUCER
const curuser = (state, action) => {
  if (action.type === "SETUSER")
    return {
      username: action.username,
      pods: state.pods,
      activities: state.activities,
      notifications: state.notifications,
    };
  else if (action.type === "SETPODS")
    return {
      username: state.username,
      pods: action.pods,
      activities: state.activities,
      notifications: state.notifications,
    };
  else if (action.type === "SETACTIVITIES")
    return {
      username: state.username,
      pods: state.pods,
      activities: action.activities,
      notifications: state.notifications,
    };
  else if (action.type === "SETNOTIFICATIONS")
    return {
      username: state.username,
      pods: state.pods,
      activities: state.activities,
      notifications: action.notifications,
    };
  else if (action.type === 'SETPODSACTIVITIESNOTIFICATIONS') {
    return {
      username: state.username,
      pods: action.pods,
      activities: action.activities,
      notifications: action.notifications,
    };
  }
  else {
    return {
      username: action.username,
      pods: action.pods,
      activities: action.activities,
      notifications: action.notifications,
    };
  }
};

let store = createStore(curuser);
const allfunctions = { store, setUser, setPods, setActivities, setNotifications, setPodsActivitiesNotifications }
//DISPATCH
export default allfunctions;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

