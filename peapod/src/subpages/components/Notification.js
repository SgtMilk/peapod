import React from 'react'
import './Notification.css';
import redux from "../../index";
import axios from "axios"
import serverAddress from "../../constants"
import { useHistory } from "react-router-dom";

export const Notification = ({ index, notification }) => {

    let history = useHistory();

    const accept = async () => {
        const axiosOptions = {
            method: "put",
            baseURL: serverAddress,
            url: `/api/notifications/${notification.notification_uuid}`,
            data: {
                accepted: true,
            },
            headers: {
                "Access-Control-Allow-Credentials": true,
                "Content-Type": "application/json",
            },
            withCredentials: true,
        }
        const response = await axios(axiosOptions);
        document.getElementById('wrapper2-notifications').style.opacity = 0;
        document.getElementById('button-titlebar-notifications').style.opacity = 0;
        document.getElementById('button-back-titlebar-notifications').style.opacity = 0;
        setTimeout(function () {
            history.push('/notifications');
        }, 500)
         
    }

    const decline = async () => {
        const axiosOptions = {
            method: "put",
            baseURL: serverAddress,
            url: `/api/notifications/${notification.notification_uuid}`,
            data: {
                declined: true,
            },
            headers: {
                "Access-Control-Allow-Credentials": true,
                "Content-Type": "application/json",
            },
            withCredentials: true,
        }
        const response = await axios(axiosOptions);
        redux.store.dispatch(
            redux.setNotifications(
                redux.store.getState().notifications.filter(
                    (notif) => notif.notification_uuid !== notification.notification_uuid
                )
            )
        )
        history.push("/notifications");
    }

    return (
        <div className='notification'>
            <p className='groupname-notification'>{redux.store.getState().notifications[index].message}</p>
            <div className='wrapper-progress-notification'>
                <button className='button-notification' id='button-notification' onClick={accept}>Accept</button>
                <button className='button-notification' id='button-notification' onClick={decline}>Decline</button>
            </div>
        </div>
    )
}
