import React from 'react'
import './Notifications.css'
import { useHistory } from "react-router-dom";
import redux from "../index";
import {Notification} from './components/Notification';

export const Notifications = () => {
    let history = useHistory();

    const testDataNotification = [{groupname: 'beep boop'}, {groupname: 'beep boop'}, {groupname: 'beep boop'}]

    const initialSetupNotifications = () => {
        console.log('axios get here');
        redux.store.dispatch(redux.setNotifications(testDataNotification));
        setTimeout(function() {
            document.getElementById('wrapper2-notifications').style.opacity = 1;
            document.getElementById('button-titlebar-notifications').style.opacity = 1;
            document.getElementById('button-back-titlebar-notifications').style.opacity = 1;
        },100)       
    }

    const goLogout = () => {
        redux.store.dispatch(redux.setUser(undefined));
        document.getElementById('wrapper2-notifications').style.opacity = 0;
        document.getElementById('button-titlebar-notifications').style.opacity = 0;
        document.getElementById('wrapper-button-notifications').style.height = '25vh';
        document.getElementById('wrapper-button-notifications').style.width = '40vw';
        document.getElementById('wrapper2-notifications').style.height = '25vh';
        document.getElementById('wrapper2-notifications').style.width = '40vw';
        setTimeout(function() {
            history.push("/");
        },500)
    }

    const goBack = () => {
        document.getElementById('wrapper2-notifications').style.opacity = 0;
        document.getElementById('button-titlebar-notifications').style.opacity = 0;
        document.getElementById('button-back-titlebar-notifications').style.opacity = 0;
        setTimeout(function() {
            history.push("/dashboard");
        },500)
    }

    return (
        <div>
            <div className = 'notifications' onLoad = {initialSetupNotifications()}>
            <div className = 'titlebar-notifications'>
                <button onClick = {goBack} className = 'button-titlebar-notifications' id = 'button-back-titlebar-notifications'>Back</button>
                <p className = 'title-titlebar-notifications'>Peapod</p>
                <button onClick = {goLogout} className = 'button-titlebar-notifications' id = 'button-titlebar-notifications'>Logout</button>
            </div>
            <div className = 'body-notifications'>
                    <div className = 'wrapper-button-notifications' id = 'wrapper-button-notifications' >
                        <div id = 'wrapper2-notifications'>
                            <ul className="list-notifications-notifications">
                                {redux.store.getState().notifications.map((notification, index) => (
                                    <Notification props={index} key={index} />
                                ))}
                            </ul>
                        </div>
                    </div>
            </div>
        </div>
        </div>
    )
}
