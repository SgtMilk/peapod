import React from 'react'
import './AddPod.css'
import { useHistory } from "react-router-dom";
import redux from "../index";
import { useForm } from "react-hook-form";
import serverAddress from "../constants";
import axios from "axios"

export const AddPod = () => {
    let history = useHistory();

    const { handleSubmit, register } = useForm();

    const initialSetupAddPod = () => {
        setTimeout(function () {
            document.getElementById('wrapper2-addpod').style.opacity = 1;
            document.getElementById('button-titlebar-addpod').style.opacity = 1;
            document.getElementById('button-back-titlebar-addpod').style.opacity = 1;
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
        document.getElementById('wrapper2-addpod').style.opacity = 0;
        document.getElementById('button-titlebar-addpod').style.opacity = 0;
        document.getElementById('wrapper-button-addpod').style.height = '25vh';
        document.getElementById('wrapper-button-addpod').style.width = '40vw';
        document.getElementById('wrapper2-addpod').style.height = '25vh';
        document.getElementById('wrapper2-addpod').style.width = '40vw';
        setTimeout(function () {
            history.push("/");
        }, 500)
    }

    const goBack = () => {
        redux.store.dispatch(redux.setUser(undefined));
        document.getElementById('wrapper2-addpod').style.opacity = 0;
        document.getElementById('button-titlebar-addpod').style.opacity = 0;
        document.getElementById('button-back-titlebar-addpod').style.opacity = 0;
        setTimeout(function () {
            history.push("/dashboard");
        }, 500)
    }

    const onChange = (values) => {
        for (let i = 1; i < 10; i++) {
            document.getElementById(`email${i + 1}-addpod`).style.display = "flex";
        }
        for (let i = 1; i < 10; i++) {
            if (values.numberOfMembers < i + 1) {
                document.getElementById(`email${i + 1}-addpod`).style.display = "none";
            }
        }
    };

    const goCancel = () => {
        document.getElementById('wrapper2-addpod').style.opacity = 0;
        document.getElementById('button-titlebar-addpod').style.opacity = 0;
        document.getElementById('button-back-titlebar-addpod').style.opacity = 0;
        setTimeout(function () {
            history.push("/pods");
        }, 500);
        return false;
    }

    const onSubmit = async (values) => {
        const axiosOptions = {
            method: "post",
            headers: {
                "Access-Control-Allow-Credentials": true,
                "Content-Type": "application/json",
            },
            baseURL: serverAddress,
            url: "/api/pods",
            data: {
                name: values.name,
                emails: [values.email2, values.email3, values.email4, values.email5, values.email6, values.email7, values.email8, values.email9, values.email10]
            },
            withCredentials: true,
        }
        await axios(axiosOptions);
        history.push("/pods")
    }

    return (
        <div className='addpod' onLoad={initialSetupAddPod()}>
            <div className='titlebar-addpod'>
                <button onClick={goBack} className='button-titlebar-addpod' id='button-back-titlebar-addpod'>Back</button>
                <p className='title-titlebar-addpod'>Peapod</p>
                <button onClick={goLogout} className='button-titlebar-addpod' id='button-titlebar-addpod'>Logout</button>
            </div>
            <div className='body-addpod'>
                <div className='wrapper-button-addpod' id='wrapper-button-addpod' >
                    <form id='wrapper2-addpod' onChange={handleSubmit(onChange)} onSubmit={handleSubmit(onSubmit)}>
                        <div className='input-wrapper-addpod'>
                            <label>Group Name</label>
                            <input name='name' ref={register} className='input-text-addpod' type='text' maxLength='64' required />
                        </div>
                        <div className='input-wrapper-addpod'>
                            <label>Number of Pod Members</label>
                            <select ref={register} className='input-text-addpod' name='numberOfMembers' defaultValue='2'>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                        </div>
                        <div className='input-wrapper-addpod'>
                            <label>Emails</label>
                            <input ref={register} type='text' className='input-text-addpod' maxLength='64' minLength='1' id='email2-addpod' name='email2' />
                            <input ref={register} type='text' className='input-text-addpod' maxLength='64' minLength='1' id='email3-addpod' name='email3' />
                            <input ref={register} type='text' className='input-text-addpod' maxLength='64' minLength='1' id='email4-addpod' name='email4' />
                            <input ref={register} type='text' className='input-text-addpod' maxLength='64' minLength='1' id='email5-addpod' name='email5' />
                            <input ref={register} type='text' className='input-text-addpod' maxLength='64' minLength='1' id='email6-addpod' name='email6' />
                            <input ref={register} type='text' className='input-text-addpod' maxLength='64' minLength='1' id='email7-addpod' name='email7' />
                            <input ref={register} type='text' className='input-text-addpod' maxLength='64' minLength='1' id='email8-addpod' name='email8' />
                            <input ref={register} type='text' className='input-text-addpod' maxLength='64' minLength='1' id='email9-addpod' name='email9' />
                            <input ref={register} type='text' className='input-text-addpod' maxLength='64' minLength='1' id='email10-addpod' name='email10' />
                        </div>
                        <div className='buttons-addpod'>
                            <button type="button" className='button-addpod' onClick={goCancel}>Cancel</button>
                            <input className='button-addpod' value='Add Pod' type='submit' />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
