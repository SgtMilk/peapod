/*
 * Copyright (C) 2020 Alix Routhier-Lalonde, Adam Di Re, Ricky Liu
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import React from 'react'
import './Dashboard.css'
import redux from "../index";
import CircularProgress from '@material-ui/core/CircularProgress';
import { Pod } from './components/Pod';
import { Activity } from './components/Activity';
import { useHistory } from "react-router-dom";
import { useQuery } from "react-query"
import serverAddress from "../constants"
import axios from "axios"

export const Dashboard = () => {
    //let numberOfNotifications = 2;
    //let percentage = 70;
    //const testDataPod = [{ groupname: 'beep boop', names: ['beep', 'boop', 'bweep', 'gg', 'aaaa', 'ddd', 'hhh'], maxValue: 70 }, { groupname: 'beep boop', names: ['beep', 'boop', 'bweep'], maxValue: 20 }, { groupname: 'beep boop', names: ['beep', 'boop', 'bweep'], maxValue: 50 }];
    //const testDataActivity = [{ name: 'beep', risk: 90, date: '11/11/1111' }, { name: 'beep', risk: 90, date: '11/11/1111' }, { name: 'beep', risk: 90, date: '11/11/1111' }]
    //const testDataNotification = [{ groupname: 'beep boop' }, { groupname: 'beep boop' }, { groupname: 'beep boop' }]

    let history = useHistory();

    const [isLoading1, setLoading1] = React.useState(true);
    const [isLoading2, setLoading2] = React.useState(true);
    const [isLoading3, setLoading3] = React.useState(true);
    const [isLoading4, setLoading4] = React.useState(true);

    React.useEffect(() => {
        //  Get user
        const fetchUser = async () => {
            const userOptions = {
                method: "get",
                baseURL: serverAddress,
                url: "/auth/login/success",
                headers: {
                    "Access-Control-Allow-Credentials": true,
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            };
            const response = await axios(userOptions);
            //  Set state in redux for user
            redux.store.dispatch(redux.setUser(response.data.user));
            setLoading1(false);
            const fetchNotifications = async () => {
                const notificationsOptions = {
                    method: "get",
                    baseURL: serverAddress,
                    url: "/api/notifications",
                    headers: {
                        "Access-Control-Allow-Credentials": true,
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                };
                const response = await axios(notificationsOptions);
                //  Set state in redux for user
                redux.store.dispatch(redux.setNotifications(response.data.notifications));
                setLoading2(false);
                const fetchPods = async () => {
                    const podsOptions = {
                        method: "get",
                        baseURL: serverAddress,
                        url: "/api/pods",
                        headers: {
                            "Access-Control-Allow-Credentials": true,
                            "Content-Type": "application/json",
                        },
                        withCredentials: true,
                    };
                    const response = await axios(podsOptions);
                    //  Set state in redux for user
                    redux.store.dispatch(redux.setPods(response.data.pods));
                    setLoading3(false);
                    const fetchActivities = async () => {
                        const activitiesOptions = {
                            method: "get",
                            baseURL: serverAddress,
                            url: "/api/activities",
                            headers: {
                                "Access-Control-Allow-Credentials": true,
                                "Content-Type": "application/json",
                            },
                            withCredentials: true,
                        };
                        const response = await axios(activitiesOptions);
                        //  Set state in redux for user
                        redux.store.dispatch(redux.setActivities(response.data.activities));
                        setLoading4(false);
                    }
                    fetchActivities()
                }
                fetchPods()
            }
            fetchNotifications()
        }
        fetchUser()
    }, []);


    const initialSetupDashboard = () => {
        setTimeout(function() {
            document.getElementById('wrapper2-dashboard').style.opacity = 1;
            document.getElementById('button-titlebar-dashboard').style.opacity = 1;
        }, 100)
    }

    const goDisclaimer = () => {
        window.open('https://www.cdc.gov/coronavirus/2019-ncov/if-you-are-sick/quarantine.html');
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
        document.getElementById('wrapper2-dashboard').style.opacity = 0;
        document.getElementById('button-titlebar-dashboard').style.opacity = 0;
        document.getElementById('a2-grid-dashboard').style.opacity = 0;
        document.getElementById('wrapper-button-dashboard').style.height = '25vh';
        document.getElementById('wrapper-button-dashboard').style.width = '40vw';
        document.getElementById('wrapper2-dashboard').style.height = '25vh';
        document.getElementById('wrapper2-dashboard').style.width = '40vw';
        setTimeout(function () {
            history.push("/");
        }, 500)
    }

    const goPods = () => {
        document.getElementById('wrapper2-dashboard').style.opacity = 0;
        document.getElementById('button-titlebar-dashboard').style.opacity = 0;
        document.getElementById('a2-grid-dashboard').style.opacity = 0;
        setTimeout(function () {
            history.push("/pods");
        }, 500)
    }

    const goActivities = () => {
        document.getElementById('wrapper2-dashboard').style.opacity = 0;
        document.getElementById('button-titlebar-dashboard').style.opacity = 0;
        document.getElementById('a2-grid-dashboard').style.opacity = 0;
        setTimeout(function () {
            history.push("/activities");
        }, 500)
    }

    const goNotifications = () => {
        document.getElementById('wrapper2-dashboard').style.opacity = 0;
        document.getElementById('button-titlebar-dashboard').style.opacity = 0;
        document.getElementById('a2-grid-dashboard').style.opacity = 0;
        setTimeout(function () {
            history.push("/notifications");
        }, 500)
    }

    const gotCovid = async () => {
        const axiosOptions = {
            method: "put",
            data: {
                hascovid: !redux.store.getState().username.hascovid, //    user from state
            },
            headers: {
                "Access-Control-Allow-Credentials": true,
                "Content-Type": "application/json",
            },
            baseURL: serverAddress,
            url: "/api/user",
            withCredentials: true,
        }
        const response = await axios(axiosOptions);
        const userData = response.user;
        redux.store.dispatch(redux.setUser(userData));
    }


    //  User Query
    const userOptions = {
        method: "get",
        baseURL: serverAddress,
        url: "/auth/login/success",
        headers: {
            "Access-Control-Allow-Credentials": true,
            "Content-Type": "application/json",
        },
        withCredentials: true,
    };

    /*
    const userQuery = useQuery(
        "user",
        () =>
            axios(userOptions).then((response) => {
                //  Set state in redux for user
                redux.store.dispatch(redux.setUser(response.user));
            }),
        { enabled: !redux.store.getState().username.user_uuid, retry: false }
    );
    */

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
        "notifications",
        () =>
            axios(notificationsOptions).then((response) => {
                //  Set state in redux for notifications
                redux.store.dispatch(redux.setNotifications(response.data.notifications));
            }),
    );


    //  Activities Query
    const activitiesOptions = {
        method: "get",
        baseURL: serverAddress,
        url: "/api/activities/",
        headers: {
            "Access-Control-Allow-Credentials": true,
            "Content-Type": "application/json",
        },
        params: {
            limit: 3
        },
        withCredentials: true,
    };

    const activitiesQuery = useQuery(
        "activities",
        () =>
            axios(activitiesOptions).then((response) => {
                //  Set state in redux for activities
                redux.store.dispatch(redux.setActivities(response.data.activities));
            }),
    );

    //  Pods Query
    const podsOptions = {
        method: "get",
        baseURL: serverAddress,
        url: "/api/pods/",
        headers: {
            "Access-Control-Allow-Credentials": true,
            "Content-Type": "application/json",
        },
        params: {
            limit: 3
        },
        withCredentials: true,
    };

    const podsQuery = useQuery(
        "pods",
        () =>
            axios(podsOptions).then((response) => {
                //  Set state in redux for pods
                redux.store.dispatch(redux.setPods(response.data.pods));
            }),
    );

    if (isLoading1 || isLoading2 || isLoading3 || isLoading4) {
        return (
        <div className='dashboard' onLoad={initialSetupDashboard()}>
            <div className='titlebar-dashboard'>
                <div className='dummy-titlebar'></div>
                <p className='title-titlebar-dashboard'>Peapod</p>
                <button onClick={goLogout} className='button-titlebar-dashboard' id='button-titlebar-dashboard'>Logout</button>
            </div>
            <div className='body-dashboard'>
                <div className='wrapper-button-dashboard' id='wrapper-button-dashboard' >
                    <div id='wrapper2-dashboard'>
                        <p id='a1-grid-dashboard'>Exposure Meter</p>
                        <div className="special-grid-item-dashboard" id='a2-grid-dashboard'>
                        </div>
                        <p id='a3-grid-dashboard'>Pods</p>
                        <button className="grid-item-dashboard" id='a4-grid-dashboard' onClick={goPods}>
                            
                        </button>
                        <p id='a5-grid-dashboard'>Your Activities</p>
                        <button className="grid-item-dashboard" id='a6-grid-dashboard' onClick={goActivities}>
                            
                        </button>
                        <p id='a7-grid-dashboard'>Others</p>
                        <div className="special-grid-item-dashboard" id='a8-grid-dashboard' >
                            <div id='a7-grid-dashboard'>
                                <button className='button-titlebar-dashboard' id='other-buttons-dashboard1' onClick={goNotifications}>{`Notifications`}</button>
                                <button className='button-titlebar-dashboard' id='other-buttons-dashboard2' onClick={gotCovid}>I have Covid</button>
                            </div>
                            <button onClick={goDisclaimer} className='disclaimer-dashboard'>
                                <p>Disclaimer</p>
                                <p>This web-app should only be used to schedule essential meeting between individuals. Do not use it to bypass federal regulations on COVID-19. Do not take any unnecessary risks. By using our web-app, you understand that the creators are removing themselves from all liability from the usage of this web-app.</p>
                                <p>Copyright © 2020 Alix Routhier-Lalonde, Ricky Liu, Adam Di Re</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }

    return (
        <div className='dashboard' onLoad={initialSetupDashboard()}>
            <div className='titlebar-dashboard'>
                <div className='dummy-titlebar'></div>
                <p className='title-titlebar-dashboard'>Peapod</p>
                <button onClick={goLogout} className='button-titlebar-dashboard' id='button-titlebar-dashboard'>Logout</button>
            </div>
            <div className='body-dashboard'>
                <div className='wrapper-button-dashboard' id='wrapper-button-dashboard' >
                    <div id='wrapper2-dashboard'>
                        <p id='a1-grid-dashboard'>Exposure Meter</p>
                        <div className="special-grid-item-dashboard" id='a2-grid-dashboard'>
                            <script>{console.log(redux.store.getState())}</script>
                            <CircularProgress variant="static" value={redux.store.getState().username.riskLevel} size={'23vh'} id='circular-progress-dashboard' />
                            <p className='percentage-dashboard' id='percentage-dashboard'>{`${redux.store.getState().username.riskLevel}%`}</p>
                        </div>
                        <p id='a3-grid-dashboard'>Pods</p>
                        <button className="grid-item-dashboard" id='a4-grid-dashboard' onClick={goPods}>
                            <ul className="list-pods-dashboard">
                                {redux.store.getState().pods && redux.store.getState().pods.map((pod, index) => (
                                    <Pod props={index} key={index} />
                                ))}
                            </ul>
                        </button>
                        <p id='a5-grid-dashboard'>Your Activities</p>
                        <button className="grid-item-dashboard" id='a6-grid-dashboard' onClick={goActivities}>
                            <ul className="list-pods-dashboard">
                                {redux.store.getState().activities && redux.store.getState().activities.map((activity, index) => (
                                    <Activity props={index} key={index} />
                                ))}
                            </ul>
                        </button>
                        <p id='a7-grid-dashboard'>Others</p>
                        <div className="special-grid-item-dashboard" id='a8-grid-dashboard' >
                            <div id='a7-grid-dashboard'>
                                <button className='button-titlebar-dashboard' id='other-buttons-dashboard1' onClick={goNotifications}>{`Notifications (${redux.store.getState().notifications.length})`}</button>
                                <button className='button-titlebar-dashboard' id='other-buttons-dashboard2' onClick={gotCovid}>I have Covid</button>
                            </div>
                            <button onClick={goDisclaimer} className='disclaimer-dashboard'>
                                <p>Disclaimer</p>
                                <p>This web-app should only be used to schedule essential meeting between individuals. Do not use it to bypass federal regulations on COVID-19. Do not take any unnecessary risks. By using our web-app, you understand that the creators are removing themselves from all liability from the usage of this web-app.</p>
                                <p>Copyright © 2020 Alix Routhier-Lalonde, Ricky Liu, Adam Di Re</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
