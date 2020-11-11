import React from 'react'
import './Pods2.css'
import redux from "../../index";
import CircularProgress from '@material-ui/core/CircularProgress';

export const Pods2 = (index) => {

    const expand = (index) => {
        console.log('beep')
        if(document.getElementById('pods2').style.height === '3vh')document.getElementById('pods2').style.height = '20vh';
        else document.getElementById('pods2').style.height = '3vh';
    }

    return (
        <button className = 'pods2' id = 'pods2' onClick = {expand}>
            <p className = 'groupname-pods2'>{redux.store.getState().pods[index.props].groupname}</p>
            <div className = 'wrapper-progress-pods2'>
                <CircularProgress variant="static" value={redux.store.getState().pods[index.props].maxValue} size = {'5vh'}/>
                <p className = 'percentage-pods2'>{`${redux.store.getState().pods[index.props].maxValue}%`}</p>
            </div>
        </button>
    )
}
