import React from 'react'
import "./Activities2.css";
import redux from "../../index";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios"
import serverAddress from "../../constants"
import { useHistory } from "react-router-dom"

export const Activities2 = (index) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const history = useHistory();
  const expand = (index) => {
    setIsExpanded(!isExpanded);
  };

  const removeActivity = async () => {
    const axiosOptions = {
      method: "delete",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json",
      },
      baseURL: serverAddress,
      url: `/api/activities/${redux.store.getState().pods[index.props].pod_uuid}`,
      withCredentials: true,
    }
    const response = await axios(axiosOptions);
    history.push("/activities")
  }

  const expandMe = isExpanded ? "activities2 expanded" : "activities2";
  const expandMe2 = isExpanded ? "other-stuff-activities2 expanded2" : "other-stuff-activities2";
  return (
    <button className={expandMe} id="activities2" onClick={expand}>
      <div className='titlebar-wrapper-activities2'>
        <p className="groupname-activities2">
          {redux.store.getState().activities[index.props].name}
        </p>
        <p className='date-activities2'>{redux.store.getState().activities[index.props].date}</p>
      </div>
      <div className={expandMe2}>
        <button className='button-activities2' onClick={removeActivity}>Remove This Activity</button>
      </div>
    </button>
  );
}
