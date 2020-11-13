import React from 'react'
import './Notification.css';
import redux from "../../index";
import axios from "axios"
import serverAddress from "../../constants"

export const Notification = ({ index, notification }) => {

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
        redux.store.dispatch(
            redux.setNotifications(
                redux.store.getState().notifications.filter(
                    (notif) => notif.notification_uuid !== notification.notification_uuid
                )
            )
        )
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
    }

    return (
        <div className='notification'>
            <p className='groupname-notification'>{redux.store.getState().notifications[index.props].groupname}</p>
            <div className='wrapper-progress-notification'>
                <button className='button-notification' id='button-notification' onClick={accept}>Accept</button>
                <button className='button-notification' id='button-notification' onClick={decline}>Decline</button>
            </div>
        </div>
    )
}
