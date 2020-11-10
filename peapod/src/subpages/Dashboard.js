/*
 * Copyright (C) 2020 Alix Routhier-Lalonde, Adam Di Re, Ricky Liu
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import React from 'react'
import './Dashboard.css'
import CircularProgress from '@material-ui/core/CircularProgress';
import { StylesProvider } from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow'

export const Dashboard = () => {
    return (
        <div className = 'dashboard'>
            <div className = 'titlebar-dashboard'>
                <p>Peapod</p>
            </div>
            <div className = 'body-dashboard'>
                <div className = 'wrapper-button-dashboard' id = 'wrapper-button-login'>
                    <button class="grid-item-dashboard">
                        <StylesProvider injectFirst>
                            <CircularProgress variant="static" value={70} size = {'25vh'} color = {yellow['A100']}/>
                        </StylesProvider>
                    </button>
                    <button class="grid-item-dashboard">2</button>
                    <button class="grid-item-dashboard">3</button>
                    <button class="grid-item-dashboard">4</button>
                </div>
            </div>
        </div>
    )
}
