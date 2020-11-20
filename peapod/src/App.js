/*
 * Copyright (C) 2020 Alix Routhier-Lalonde, Adam Di Re, Ricky Liu
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import { Login } from "./subpages/Login";
import {Dashboard} from "./subpages/Dashboard"
import {Pods} from "./subpages/Pods"
import {Activities} from "./subpages/Activities"
import {AddPod} from './subpages/AddPod'
import {AddActivity} from './subpages/AddActivity'
import {Notifications} from './subpages/Notifications'
import {NotFoundPage} from "./subpages/NotFoundPage"

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/dashboard" exact component={Dashboard} />
        <Route exact path="/" exact component={Login} />
        <Route exact path="/pods" exact component={Pods} />
        <Route exact path="/activities" exact component={Activities} />
        <Route exact path="/addpod" exact component={AddPod} />
        <Route exact path="/addactivity" exact component={AddActivity} />
        <Route exact path="/notifications" exact component={Notifications} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
