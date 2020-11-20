/*
 * Copyright (C) 2020 Alix Routhier-Lalonde, Adam Di Re, Ricky Liu
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import React from 'react'
import './Login.css'
import serverAddress from '../constants'
import redux from "../index";
import { useHistory } from "react-router-dom";
import { useQuery } from "react-query"
import axios from "axios"

export const Login = () => {
    let history = useHistory();

    const goSignIn = () => {
        document.getElementById('wrapper-button-login').style.height = '50vh';
        document.getElementById('wrapper-button-login').style.width = '50vw';
        document.getElementById('screen1-login').style.opacity = 0;
        document.getElementById('screen1-login').style.zIndex = -1;
        document.getElementById('screen2-login').style.opacity = 1;
        document.getElementById('screen2-login').style.zIndex = 'inherit';
    }


    const goBack = () => {
        document.getElementById('wrapper-button-login').style.height = '25vh';
        document.getElementById('wrapper-button-login').style.width = '40vw';
        document.getElementById('screen1-login').style.opacity = 1;
        document.getElementById('screen1-login').style.zIndex = 'inherit';
        document.getElementById('screen2-login').style.opacity = 0;
        document.getElementById('screen2-login').style.zIndex = -1;
    }

    const handleGoogle = async () => {
        document.getElementById('wrapper-button-login').style.height = '80vh';
        document.getElementById('wrapper-button-login').style.width = '90vw';
        document.getElementById('wrapper2-login').style.height = '80vh';
        document.getElementById('wrapper2-login').style.width = '90vw';
        document.getElementById('screen2-login').style.opacity = 0;
        setTimeout(function() {
            window.open(`${serverAddress}/auth/google`, "_self");
        },500)
    };

    const handleFacebook = async () => {
        document.getElementById('wrapper-button-login').style.height = '80vh';
        document.getElementById('wrapper-button-login').style.width = '90vw';
        document.getElementById('wrapper2-login').style.height = '80vh';
        document.getElementById('wrapper2-login').style.width = '90vw';
        document.getElementById('screen2-login').style.opacity = 0;
        setTimeout(function() {
            window.open(`${serverAddress}/auth/facebook`, "_self");
        },500)
    };

    const initialSetupLogin = () => {
        setTimeout(function() {
            document.getElementById('wrapper2-login').style.opacity = 1;
        }, 100) 
        
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

    const userQuery = useQuery(
        "userDashboard",
        () =>
            axios(userOptions).then((response) => {
                //  Set state in redux for user
                redux.store.dispatch(redux.setUser(response.data.user));
                history.push('/dashboard');
            }),
        { enabled: true, retry: false }
    );

    if (userQuery.isError) {
        history.push("/");
    }

    return (
        <div className = 'login' onLoad = {initialSetupLogin()}>
            <div className = 'titlebar-login'>
                <p>Peapod</p>
            </div>
             <div className = 'body-login'>
                <div className = 'wrapper-button-login' id = 'wrapper-button-login'>
                    <div className = 'wrapper2-login' id = 'wrapper2-login'>
                        <div className = 'screen1-login' id = 'screen1-login'>
                            <button className = 'button-login' onClick = {goSignIn}>Sign In</button>
                        </div>
                        <div className = 'screen2-login' id = 'screen2-login'>
                        <button className = 'button-login' onClick = {handleGoogle}>Sign In With Google</button>
                            <button className = 'button-login' onClick = {handleFacebook}>Sign In With Facebook</button>
                            <button className = 'button-login' onClick = {goBack}>Back</button>
                        </div>
                    </div>
                </div>    
            </div>
        </div>
    )
}
