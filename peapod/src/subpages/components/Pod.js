/*
 * Copyright (C) 2020 Alix Routhier-Lalonde, Adam Di Re, Ricky Liu
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import React from 'react'
import './Pod.css';
import redux from "../../index";
import CircularProgress from '@material-ui/core/CircularProgress';

export const Pod = (index) => {

    return (
        <div className='pod'>
            <p className='groupname-pod'>{redux.store.getState().pods[index.props].name}</p>
            <div className='wrapper-progress-pod'>
                <CircularProgress variant="static" value={10/*redux.store.getState().pods[index.props].maxValue*/} size={'5vh'} />
                <p className='percentage-pod'>{10/*`${redux.store.getState().pods[index.props].maxValue}%`*/}</p>
            </div>
        </div>
    )
}
