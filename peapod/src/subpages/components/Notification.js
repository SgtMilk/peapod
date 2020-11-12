import React from 'react'
import './Notification.css';
import redux from "../../index";

export const Notification = (index) => {

    const accept = () => {
        console.log('axios post here');
    }

    const decline = () => {
        console.log('axios post here');
    }

    return (
        <div className = 'notification'>
            <p className = 'groupname-notification'>{redux.store.getState().notifications[index.props].groupname}</p>
            <div className = 'wrapper-progress-notification'>
                <button className = 'button-notification' id = 'button-notification' onClick = {accept}>Accept</button>
                <button className = 'button-notification' id = 'button-notification' onClick = {decline}>Decline</button>
            </div>
        </div>
    )
}
