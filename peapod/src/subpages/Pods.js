import React from 'react'
import './Pods.css'
import { useHistory } from "react-router-dom";
import redux from "../index";
import { Pods2 } from './components/Pods2';
import serverAddress from "../constants"
import axios from "axios"
import { useQuery } from "react-query"

export const Pods = () => {
    let history = useHistory();

    const initialSetupPods = () => {
        setTimeout(function () {
            document.getElementById('wrapper2-pods').style.opacity = 1;
            document.getElementById('button-titlebar-pods').style.opacity = 1;
            document.getElementById('button-back-titlebar-pods').style.opacity = 1;
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
        document.getElementById('wrapper2-pods').style.opacity = 0;
        document.getElementById('button-titlebar-pods').style.opacity = 0;
        document.getElementById('wrapper-button-pods').style.height = '25vh';
        document.getElementById('wrapper-button-pods').style.width = '40vw';
        document.getElementById('wrapper2-pods').style.height = '25vh';
        document.getElementById('wrapper2-pods').style.width = '40vw';
        setTimeout(function () {
            history.push("/");
        }, 500)
    }

    const goBack = () => {
        document.getElementById('wrapper2-pods').style.opacity = 0;
        document.getElementById('button-titlebar-pods').style.opacity = 0;
        document.getElementById('button-back-titlebar-pods').style.opacity = 0;
        setTimeout(function () {
            history.push("/dashboard");
        }, 500)
    }

    const goAddPod = () => {
        document.getElementById('wrapper2-pods').style.opacity = 0;
        document.getElementById('button-titlebar-pods').style.opacity = 0;
        document.getElementById('button-back-titlebar-pods').style.opacity = 0;
        setTimeout(function () {
            history.push("/addpod");
        }, 500)
    }

    //  Pods Query
    const podsOptions = {
        method: "get",
        baseURL: serverAddress,
        url: "/api/pods/",
        headers: {
            "Access-Control-Allow-Credentials": true,
            "Content-Type": "application/json",
        },
        withCredentials: true,
    };

    const podsQuery = useQuery(
        "pods",
        () =>
            axios(podsOptions).then((response) => {
                //  Set state in redux for pods

                if (response.data.pods !== undefined) {
                    redux.store.dispatch(redux.setPods(response.data.pods));
                }
            }),
    );

    if (podsQuery.isLoading) {
        return (
            <div>
                <div className='pods' onLoad={initialSetupPods()}>
                    <div className='titlebar-pods'>
                        <button onClick={goBack} className='button-titlebar-pods' id='button-back-titlebar-pods'>Back</button>
                        <p className='title-titlebar-pods'>Peapod</p>
                        <button onClick={goLogout} className='button-titlebar-pods' id='button-titlebar-pods'>Logout</button>
                    </div>
                    <div className='body-pods'>
                        <div className='wrapper-button-pods' id='wrapper-button-pods' >
                            <div id='wrapper2-pods'>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className='pods' onLoad={initialSetupPods()}>
                <div className='titlebar-pods'>
                    <button onClick={goBack} className='button-titlebar-pods' id='button-back-titlebar-pods'>Back</button>
                    <p className='title-titlebar-pods'>Peapod</p>
                    <button onClick={goLogout} className='button-titlebar-pods' id='button-titlebar-pods'>Logout</button>
                </div>
                <div className='body-pods'>
                    <div className='wrapper-button-pods' id='wrapper-button-pods' >
                        <div id='wrapper2-pods'>
                            <button className='button-pods' onClick={goAddPod}>Add a Pod</button>
                            <ul clas Name="list-pods-pods">
                                {redux.store.getState().pods.map((pod, index) => (
                                    <Pods2 props={index} key={index} />
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
