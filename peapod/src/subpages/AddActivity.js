import React from 'react'
import './AddActivity.css'
import { useHistory } from "react-router-dom";
import redux from "../index";
import { useForm } from "react-hook-form";
import axios from "axios";
import serverAddress from "../constants"

export const AddActivity = () => {
    let history = useHistory();

    const { handleSubmit, register } = useForm();

    const initialSetupAddActivity = () => {
        setTimeout(function () {
            document.getElementById('wrapper2-addactivity').style.opacity = 1;
            document.getElementById('button-titlebar-addactivity').style.opacity = 1;
            document.getElementById('button-back-titlebar-addactivity').style.opacity = 1;
        }, 100)
    }

    const goLogout = () => {
        redux.store.dispatch(redux.setUser(undefined));
        document.getElementById('wrapper2-addactivity').style.opacity = 0;
        document.getElementById('button-titlebar-addactivity').style.opacity = 0;
        document.getElementById('wrapper-button-addactivity').style.height = '25vh';
        document.getElementById('wrapper-button-addactivity').style.width = '40vw';
        document.getElementById('wrapper2-addactivity').style.height = '25vh';
        document.getElementById('wrapper2-addactivity').style.width = '40vw';
        setTimeout(function () {
            history.push("/");
        }, 500)
    }

    const goBack = () => {
        redux.store.dispatch(redux.setUser(undefined));
        document.getElementById('wrapper2-addactivity').style.opacity = 0;
        document.getElementById('button-titlebar-addactivity').style.opacity = 0;
        document.getElementById('button-back-titlebar-addactivity').style.opacity = 0;
        setTimeout(function () {
            history.push("/dashboard");
        }, 500)
    }

    const goCancel = () => {
        document.getElementById('wrapper2-addactivity').style.opacity = 0;
        document.getElementById('button-titlebar-addactivity').style.opacity = 0;
        document.getElementById('button-back-titlebar-addactivity').style.opacity = 0;
        setTimeout(function () {
            history.push("/activities");
        }, 500);
    }

    const updateSlider = () => {
        let value1 = document.getElementById('slider-people-addactivity').value;
        document.getElementById('slider-people-value').innerHTML = value1;
        let value2 = document.getElementById('slider-duration-addactivity').value;
        document.getElementById('slider-duration-value').innerHTML = value2;
    }

    const onSubmit = async (values) => {
        const axiosOptions = {
            method: "post",
            headers: {
                "Access-Control-Allow-Credentials": true,
                "Content-Type": "application/json",
            },
            baseURL: serverAddress,
            url: "/api/activities",
            data: {
                activity: {
                    name: values.name,
                    date: values.date,
                    indoor: values.indoor === "indoor" ? true : false,
                    mask: values.masks === "yes" ? true : false,
                    socialInteraction: values.socialInteraction === "yes" ? true : false,
                    peoplePresent: values.numberOfPeople,
                    duration: values.duration,
                }
            },
            withCredentials: true,
        }

        await axios(axiosOptions);
        history.push("/activities")
    }

    return (
        <div>
            <div className='addactivity' onLoad={initialSetupAddActivity()}>
                <div className='titlebar-addactivity'>
                    <button onClick={goBack} className='button-titlebar-addactivity' id='button-back-titlebar-addactivity'>Back</button>
                    <p className='title-titlebar-addactivity'>Peapod</p>
                    <button onClick={goLogout} className='button-titlebar-addactivity' id='button-titlebar-addactivity'>Logout</button>
                </div>
                <div className='body-addactivity'>
                    <div className='wrapper-button-addactivity' id='wrapper-button-addactivity' >
                        <form id='wrapper2-addactivity' onChange={updateSlider} onSubmit={handleSubmit(onSubmit)}>
                            <div className='input-wrapper-addactivity'>
                                <label>Activity Name</label>
                                <input name='name' ref={register} className='input-text-addactivity' type='text' maxLength='64' required />
                            </div>
                            <div className='input-wrapper-addactivity'>
                                <label>Date</label>
                                <input name='date' ref={register} className='input-text-addactivity' type='date' min='2020-01-01' max='2100-01-01' required />
                            </div>
                            <div className='input-wrapper-addactivity'>
                                <label>Will People Be Wearing Masks Generally?</label>
                                <div className='big-wrapper-radio-addactivity'>
                                    <div className='wrapper-radio-addactivity'>
                                        <input type='radio' value='yes' name='masks' className='radio' ref={register} />
                                        <label>Yes</label>
                                    </div>
                                    <div className='wrapper-radio-addactivity'>
                                        <input type='radio' value='no' name='masks' className='radio' ref={register} />
                                        <label>No</label>
                                    </div>
                                </div>
                            </div>
                            <div className='input-wrapper-addactivity'>
                                <label>Will You Be Talking To People Face-To-Face?</label>
                                <div className='big-wrapper-radio-addactivity'>
                                    <div className='wrapper-radio-addactivity'>
                                        <input type='radio' value='yes' name='socialInteraction' className='radio' ref={register} />
                                        <label>Yes</label>
                                    </div>
                                    <div className='wrapper-radio-addactivity'>
                                        <input type='radio' value='no' name='socialInteraction' className='radio' ref={register} />
                                        <label>No</label>
                                    </div>
                                </div>
                            </div>
                            <div className='input-wrapper-addactivity'>
                                <label>Indoor Or Outdoor?</label>
                                <div className='big-wrapper-radio-addactivity'>
                                    <div className='wrapper-radio-addactivity'>
                                        <input type='radio' value='indoor' name='indoor' className='radio' ref={register} />
                                        <label>Indoor</label>
                                    </div>
                                    <div className='wrapper-radio-addactivity'>
                                        <input type='radio' value='outdoor' name='indoor' className='radio' ref={register} />
                                        <label>Outdoor</label>
                                    </div>
                                </div>
                            </div>
                            <div className='input-wrapper-addactivity'>
                                <label>How Many People Will Be There Per 25 Meters Squared (269 Feet Squared) Approximately?</label>
                                <p id='slider-people-value'>5</p>
                                <input name='numberOfPeople' type="range" min="0" max="10" className="slider-people-addactivity" id="slider-people-addactivity" defaultValue='5' ref={register} />
                            </div>
                            <div className='input-wrapper-addactivity'>
                                <label>What will be the duration of the activity (in hours)?</label>
                                <p id='slider-duration-value'>5</p>
                                <input name='duration' type="range" min="0" max="10" className="slider-duration-addactivity" id="slider-duration-addactivity" defaultValue='5' ref={register} />
                            </div>
                            <div className='buttons-addactivity'>
                                <button type="button" className='button-addactivity' onClick={goCancel}>Cancel</button>
                                <input className='button-addactivity' value='Add activity' type='submit' />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
