/*
 * Copyright (C) 2020 Alix Routhier-Lalonde, Adam Di Re, Ricky Liu
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import React from 'react'
import './Dashboard.css'
import redux from "../index";
import CircularProgress from '@material-ui/core/CircularProgress';
import {Pod} from './components/Pod';
import {Activity} from './components/Activity';
import { useHistory } from "react-router-dom";

export const Dashboard = () => {
    let numberOfNotifications = 2;
    let percentage = 70;
    const testDataPod = [{groupname: 'beep boop' , names:['beep', 'boop', 'bweep', 'gg', 'aaaa', 'ddd', 'hhh'], maxValue:70}, { groupname: 'beep boop', names: ['beep', 'boop', 'bweep'], maxValue: 20}, { groupname: 'beep boop', names: ['beep', 'boop', 'bweep'], maxValue: 50} ];
    const testDataActivity = [{name: 'beep', risk: 90, date: '11/11/1111'}, {name: 'beep', risk: 90, date: '11/11/1111'}, {name: 'beep', risk: 90, date: '11/11/1111'}]
    const testDataNotification = [{groupname: 'beep boop'}, {groupname: 'beep boop'}, {groupname: 'beep boop'}]

    let history = useHistory();

    const initialSetupDashboard = () => {
        axios.get('/user?ID=12345')
            .then(function (response) {
                // handle success
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
        console.log('axios get here');
        redux.store.dispatch(redux.setPodsActivitiesNotifications(testDataPod, testDataActivity, testDataNotification));
        setTimeout(function() {
            document.getElementById('other-buttons-dashboard1').innerHTML = `Notifications (${redux.store.getState().notifications.length})`;
            document.getElementById('wrapper2-dashboard').style.opacity = 1;
            document.getElementById('button-titlebar-dashboard').style.opacity = 1;
        },100)       
    }

    const goDisclaimer = () => {
        window.open('https://www.cdc.gov/coronavirus/2019-ncov/if-you-are-sick/quarantine.html');
    }

    const goLogout = () => {
        redux.store.dispatch(redux.setUser(undefined));
        document.getElementById('wrapper2-dashboard').style.opacity = 0;
        document.getElementById('button-titlebar-dashboard').style.opacity = 0;
        document.getElementById('a2-grid-dashboard').style.opacity = 0;
        document.getElementById('wrapper-button-dashboard').style.height = '25vh';
        document.getElementById('wrapper-button-dashboard').style.width = '40vw';
        document.getElementById('wrapper2-dashboard').style.height = '25vh';
        document.getElementById('wrapper2-dashboard').style.width = '40vw';
        setTimeout(function() {
            history.push("/login");
        },500)
    }

    const goPods = () => {
        document.getElementById('wrapper2-dashboard').style.opacity = 0;
        document.getElementById('button-titlebar-dashboard').style.opacity = 0;
        document.getElementById('a2-grid-dashboard').style.opacity = 0;
        setTimeout(function() {
            history.push("/pods");
        },500)
    }

    const goActivities = () => {
        document.getElementById('wrapper2-dashboard').style.opacity = 0;
        document.getElementById('button-titlebar-dashboard').style.opacity = 0;
        document.getElementById('a2-grid-dashboard').style.opacity = 0;
        setTimeout(function() {
            history.push("/activities");
        },500)
    }

    const goNotifications = () => {
        document.getElementById('wrapper2-dashboard').style.opacity = 0;
        document.getElementById('button-titlebar-dashboard').style.opacity = 0;
        document.getElementById('a2-grid-dashboard').style.opacity = 0;
        setTimeout(function() {
            history.push("/notifications");
        },500)
    }

    const gotCovid = () => {
        console.log('axios post here');
    }

    return (
        <div className = 'dashboard' onLoad = {initialSetupDashboard()}>
            <div className = 'titlebar-dashboard'>
                <div className = 'dummy-titlebar'></div>
                <p className = 'title-titlebar-dashboard'>Peapod</p>
                <button onClick = {goLogout} className = 'button-titlebar-dashboard' id = 'button-titlebar-dashboard'>Logout</button>
            </div>
            <div className = 'body-dashboard'>
                    <div className = 'wrapper-button-dashboard' id = 'wrapper-button-dashboard' >
                        <div id = 'wrapper2-dashboard'>
                            <p id = 'a1-grid-dashboard'>Exposure Meter</p>
                            <div className="special-grid-item-dashboard" id = 'a2-grid-dashboard'>
                                <CircularProgress variant="static" value={percentage} size = {'23vh'}/>
                                <p className = 'percentage-dashboard'>{`${percentage}%`}</p>
                            </div>
                            <p id = 'a3-grid-dashboard'>Pods</p>
                            <button className="grid-item-dashboard" id = 'a4-grid-dashboard' onClick = {goPods}>
                                <ul className="list-pods-dashboard">
                                    {redux.store.getState().pods.map((pod, index) => (
                                        <Pod props={index} key={index} />
                                    ))}
                                </ul>
                            </button>
                            <p id = 'a5-grid-dashboard'>Your Activities</p>
                            <button className="grid-item-dashboard" id = 'a6-grid-dashboard' onClick = {goActivities}>
                                <ul className="list-pods-dashboard">
                                    {redux.store.getState().activities.map((activity, index) => (
                                        <Activity props={index} key={index} />
                                    ))}
                                </ul>
                            </button>
                            <p id = 'a7-grid-dashboard'>Others</p>
                            <div className="special-grid-item-dashboard" id = 'a8-grid-dashboard' >
                                <div id = 'a7-grid-dashboard'>
                                    <button className = 'button-titlebar-dashboard' id = 'other-buttons-dashboard1' onClick = {goNotifications}>{`Notifications (${numberOfNotifications})`}</button>
                                    <button className = 'button-titlebar-dashboard' id = 'other-buttons-dashboard2' onClick = {gotCovid}>I have Covid</button>
                                </div>
                                <button onClick = {goDisclaimer} className = 'disclaimer-dashboard'>
                                    <p>Disclaimer</p>
                                    <p>This web-app should only be used to schedule essential meeting between individuals. Do not use it to bypass federal regulations on COVID-19. Do not take any unnecessary risks. By using our web-app, you understand that the creators are removing themselves from all liability from the usage of this web-app.</p>
                                    <p>Copyright © 2020 Alix Routhier-Lalonde, Ricky Liu, Adam Di Re</p>
                                </button>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}