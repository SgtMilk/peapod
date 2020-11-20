import React from 'react'
import './Notifications.css'
import { useHistory } from "react-router-dom";
import redux from "../index";
import { Notification } from './components/Notification';
import serverAddress from "../constants"
import axios from "axios"
import { useQuery } from "react-query"

export const Notifications = () => {
    let history = useHistory();

    const initialSetupNotifications = () => {
        setTimeout(function () {
            document.getElementById('wrapper2-notifications').style.opacity = 1;
            document.getElementById('button-titlebar-notifications').style.opacity = 1;
            document.getElementById('button-back-titlebar-notifications').style.opacity = 1;
        }, 500)
    }

    const goLogout = async () => {
        const axiosOptions = {
            method: "get",
            headers: {
                "Access-Control-Allow-Credentials": true,
                "Content-Type": "application/json",
            },
            baseURL: serverAddress,
            url: "/auth/logout",
            withCredentials: true,
        }
        const response = await axios(axiosOptions);
        redux.store.dispatch(redux.setUser(undefined));
        document.getElementById('wrapper2-notifications').style.opacity = 0;
        document.getElementById('button-titlebar-notifications').style.opacity = 0;
        document.getElementById('button-back-titlebar-notifications').style.opacity = 0;
        document.getElementById('wrapper-button-notifications').style.height = '25vh';
        document.getElementById('wrapper-button-notifications').style.width = '40vw';
        document.getElementById('wrapper2-notifications').style.height = '25vh';
        document.getElementById('wrapper2-notifications').style.width = '40vw';
        setTimeout(function () {
            history.push("/");
        }, 500)
    }

    const goBack = () => {
        document.getElementById('wrapper2-notifications').style.opacity = 0;
        document.getElementById('button-titlebar-notifications').style.opacity = 0;
        document.getElementById('button-back-titlebar-notifications').style.opacity = 0;
        setTimeout(function () {
            history.push("/dashboard");
        }, 500)
    }

    //  Notifications Query
    const notificationsOptions = {
        method: "get",
        baseURL: serverAddress,
        url: "/api/notifications/",
        headers: {
            "Access-Control-Allow-Credentials": true,
            "Content-Type": "application/json",
        },
        withCredentials: true,
    };

    const notificationsQuery = useQuery(
        "notificationsNotifications",
        () =>
            axios(notificationsOptions).then((response) => {
                //  Set state in redux for notifications

                if (response.data.notifications !== undefined) {
                    redux.store.dispatch(redux.setNotifications(response.data.notifications));
                }

            }),
    );

    if (notificationsQuery.isLoading) {
        return (
            <div>
                <div className='notifications' onLoad={initialSetupNotifications()}>
                    <div className='titlebar-notifications'>
                        <button onClick={goBack} className='button-titlebar-notifications' id='button-back-titlebar-notifications'>Back</button>
                        <p className='title-titlebar-notifications'>Peapod</p>
                        <button onClick={goLogout} className='button-titlebar-notifications' id='button-titlebar-notifications'>Logout</button>
                    </div>
                    <div className='body-notifications'>
                        <div className='wrapper-button-notifications' id='wrapper-button-notifications' >
                            <div id='wrapper2-notifications'>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className='notifications'>
                <div className='titlebar-notifications'>
                    <button onClick={goBack} className='button-titlebar-notifications' id='button-back-titlebar-notifications'>Back</button>
                    <p className='title-titlebar-notifications'>Peapod</p>
                    <button onClick={goLogout} className='button-titlebar-notifications' id='button-titlebar-notifications'>Logout</button>
                </div>
                <div className='body-notifications'>
                    <div className='wrapper-button-notifications' id='wrapper-button-notifications' >
                        <div id='wrapper2-notifications'>
                            <ul className="list-notifications-notifications">
                                {redux.store.getState().notifications.map((notification, index) => (
                                    <Notification index={index} key={index} notification={notification} />
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
