/*
 * Copyright (C) 2020 Alix Routhier-Lalonde, Adam Di Re, Ricky Liu
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

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
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/" exact component={Login} />
        <Route path="/pods" exact component={Pods} />
        <Route path="/activities" exact component={Activities} />
        <Route path="/addpod" exact component={AddPod} />
        <Route path="/addactivity" exact component={AddActivity} />
        <Route path="/notifications" exact component={Notifications} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
