import React from 'react'
import './AddActivity.css'
import { useHistory } from "react-router-dom";
import redux from "../index";
import { useForm } from "react-hook-form";

export const AddActivity = () => {
    let history = useHistory();

    const { handleSubmit, register } = useForm();

    const initialSetupAddActivity = () => {
        setTimeout(function() {
            document.getElementById('wrapper2-addactivity').style.opacity = 1;
            document.getElementById('button-titlebar-addactivity').style.opacity = 1;
            document.getElementById('button-back-titlebar-addactivity').style.opacity = 1;
        },100)       
    }

    const goLogout = () => {
        redux.store.dispatch(redux.setUser(undefined));
        document.getElementById('wrapper2-addactivity').style.opacity = 0;
        document.getElementById('button-titlebar-addactivity').style.opacity = 0;
        document.getElementById('wrapper-button-addactivity').style.height = '25vh';
        document.getElementById('wrapper-button-addactivity').style.width = '40vw';
        document.getElementById('wrapper2-addactivity').style.height = '25vh';
        document.getElementById('wrapper2-addactivity').style.width = '40vw';
        setTimeout(function() {
            history.push("/login");
        },500)
    }

    const goBack = () => {
        redux.store.dispatch(redux.setUser(undefined));
        document.getElementById('wrapper2-addactivity').style.opacity = 0;
        document.getElementById('button-titlebar-addactivity').style.opacity = 0;
        document.getElementById('button-back-titlebar-addactivity').style.opacity = 0;
        setTimeout(function() {
            history.push("/");
        },500)
    }

    const goCancel = () => {
        document.getElementById('wrapper2-addactivity').style.opacity = 0;
        document.getElementById('button-titlebar-addactivity').style.opacity = 0;
        document.getElementById('button-back-titlebar-addactivity').style.opacity = 0;
        setTimeout(function() {
            history.push("/activities");
        },500);
    }

    const updateSlider = () => {
        let value = document.getElementById('slider-addactivity').value;
        document.getElementById('slider-value').innerHTML = value;
    }

    return (
        <div>
            <div className = 'addactivity' onLoad = {initialSetupAddActivity()}>
            <div className = 'titlebar-addactivity'>
                <button onClick = {goBack} className = 'button-titlebar-addactivity' id = 'button-back-titlebar-addactivity'>Back</button>
                <p className = 'title-titlebar-addactivity'>Peapod</p>
                <button onClick = {goLogout} className = 'button-titlebar-addactivity' id = 'button-titlebar-addactivity'>Logout</button>
            </div>
            <div className = 'body-addactivity'>
                    <div className = 'wrapper-button-addactivity' id = 'wrapper-button-addactivity' >
                        <form id = 'wrapper2-addactivity' onChange = {updateSlider} >
                            <div className = 'input-wrapper-addactivity'>
                                <label>Activity Name</label>
                                <input ref={register} className = 'input-text-addactivity' type = 'text' maxLength = '64' required/>
                            </div>
                            <div className = 'input-wrapper-addactivity'>
                                <label>Date</label>
                                <input ref={register} className = 'input-text-addactivity' type = 'date' maxLength = '64' required/>
                            </div>
                            <div className = 'input-wrapper-addactivity'>
                                <label>Will People Be Wearing Masks Generally?</label>
                                <div className = 'big-wrapper-radio-addactivity'>
                                    <div className = 'wrapper-radio-addactivity'>
                                        <input type = 'radio' value = 'yes' name = 'masks' className = 'radio'/>
                                        <label>Yes</label>
                                    </div>
                                    <div className = 'wrapper-radio-addactivity'>
                                        <input type = 'radio' value = 'no' name = 'masks' className = 'radio'/>
                                        <label>No</label>
                                    </div>
                                </div>
                            </div>
                            <div className = 'input-wrapper-addactivity'>
                                <label>Will You Be Talking To People Face-To-Face?</label>
                                <div className = 'big-wrapper-radio-addactivity'>
                                    <div className = 'wrapper-radio-addactivity'>
                                        <input type = 'radio' value = 'yes' name = 'face-to-face' className = 'radio'/>
                                        <label>Yes</label>
                                    </div>
                                    <div className = 'wrapper-radio-addactivity'>
                                        <input type = 'radio' value = 'no' name = 'face-to-face' className = 'radio'/>
                                        <label>No</label>
                                    </div>
                                </div>
                            </div>
                            <div className = 'input-wrapper-addactivity'>
                                <label>Indoor Or Outdoor?</label>
                                <div className = 'big-wrapper-radio-addactivity'>
                                    <div className = 'wrapper-radio-addactivity'>
                                        <input type = 'radio' value = 'indoor' name = 'indoor-outdoor' className = 'radio'/>
                                        <label>Indoor</label>
                                    </div>
                                    <div className = 'wrapper-radio-addactivity'>
                                        <input type = 'radio' value = 'outdoor' name = 'indoor-outdoor' className = 'radio'/>
                                        <label>Outdoor</label>
                                    </div>
                                </div>
                            </div>
                            <div className = 'input-wrapper-addactivity'>
                                <label>How Many People Will Be There Per 25 Meters Squared (269 Feet Squared) Approximately?</label>
                                <p id = 'slider-value'>10</p>
                                <input type="range" min="0" max="20" className="slider-addactivity" id="slider-addactivity" defaultValue = '10'/>
                            </div>
                            <div className = 'buttons-addactivity'>
                                <button className = 'button-addactivity' onClick = {goCancel}>Cancel</button>
                                <input className = 'button-addactivity' value = 'Add activity' type = 'submit'/>
                            </div>
                        </form>
                    </div>
            </div>
        </div>
        </div>
    )
}
