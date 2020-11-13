import React from "react";
import "./Pods2.css";
import redux from "../../index";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import serverAddress from "../../constants"
import { useHistory } from "react-router-dom"

export const Pods2 = (index) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const history = useHistory();
  const expand = (index) => {
    setIsExpanded(!isExpanded);
  };

  const removePod = async () => {
    const axiosOptions = {
      method: "delete",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json",
      },
      baseURL: serverAddress,
      url: `/api/pods/${redux.store.getState().pods[index.props].pod_uuid}`,
      withCredentials: true,
    }
    const response = await axios(axiosOptions);
    history.push("/pods")
  }

  const maxValue = Math.max(redux.store.getState().pods[index.props].users.map((user) => user.risklevel));

  const expandMe = isExpanded ? "pods2 expanded" : "pods2";
  const expandMe2 = isExpanded ? "other-stuff-pods2 expanded2" : "other-stuff-pods2";
  return (
    <button className={expandMe} id="pods2" onClick={expand}>
      <div className='titlebar-wrapper-pods2'>
        <p className="groupname-pods2">
          {redux.store.getState().pods[index.props].name}
        </p>
        <div className="wrapper-progress-pods2">
          <CircularProgress
            variant="static"
            value={maxValue}
            size={"5vh"}
          />
          <p className="percentage-pods2">{`${maxValue}%`}</p>
        </div>
      </div>
      <div className={expandMe2}>
        <ul className="list-pods-pods2">
          {redux.store.getState().pods[index.props].users.map((user, index2) => (
            <div className='name-pods2' key={index2}>
              <p>{`${user.firstname} ${user.lastname}`}</p>
              <div className="wrapper-progress-pods2">
                <CircularProgress
                  variant="static"
                  value={user.risklevel}
                  size={"5vh"}
                />
                <p className="percentage-pods2">{`${user.risklevel}%`}</p>
              </div>
            </div>
          ))}
        </ul>
        <button className='button-pods2' onClick={removePod}>Remove This Pod</button>
      </div>
    </button>
  );
};

