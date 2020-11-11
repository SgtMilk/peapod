import React from 'react';
import './Activity.css';
import redux from "../../index";

export const Activity = (index) => {
    return (
        <div className = 'activity'>
            <p className = 'name-activity'>{redux.store.getState().activities[index.props].name}</p>
            <p className = 'date-activity'>{redux.store.getState().activities[index.props].date}</p>
        </div>
    )
}
