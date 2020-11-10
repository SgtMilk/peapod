/*
 * Copyright (C) 2020 Alix Routhier-Lalonde, Adam Di Re, Ricky Liu
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import React from 'react'
import './Dashboard.css'
import CircularProgress from '@material-ui/core/CircularProgress';

export const Dashboard = () => {
    let percentage = 70;
    const testData = [{names:['beep', 'boop', 'bweep'], maxValue:70}, {names: ['beep', 'boop', 'bweep'], maxValue: 20} ];

    const initialSetup = () => {
        setTimeout(function() {
            document.getElementById('wrapper2-dashboard').style.opacity = 1;
        },100)
        
    }

    return (
        <div className = 'dashboard' >
            <div className = 'titlebar-dashboard'>
                <p>Peapod</p>
            </div>
            <div className = 'body-dashboard'>
                    <div className = 'wrapper-button-dashboard' id = 'wrapper-button-dashboard' onLoad = {initialSetup()}>
                        <div id = 'wrapper2-dashboard'>
                            <p id = 'a1-grid-dashboard'>Exposure Meter</p>
                            <button className="grid-item-dashboard" id = 'a2-grid-dashboard'>
                                <CircularProgress variant="static" value={percentage} size = {'25vh'}/>
                                <p className = 'percentage-dashboard'>{`${percentage}%`}</p>
                            </button>
                            <p id = 'a3-grid-dashboard'>Pods</p>
                            <button className="grid-item-dashboard" id = 'a4-grid-dashboard'>2</button>
                            <p id = 'a5-grid-dashboard'>Your Activities</p>
                            <button className="grid-item-dashboard" id = 'a6-grid-dashboard'>3</button>
                            <p id = 'a7-grid-dashboard'>Something else here</p>
                            <button className="grid-item-dashboard" id = 'a8-grid-dashboard'>4</button>
                        </div>
                    </div>
            </div>
        </div>
    )
}
