import React from 'react'
import "./Activities2.css";
import redux from "../../index";
import CircularProgress from "@material-ui/core/CircularProgress";

export const Activities2 = (index) => {
    const [isExpanded, setIsExpanded] = React.useState(false);

  const expand = (index) => {
    setIsExpanded(!isExpanded);
  };

  const removeActivity = () => {
    console.log('axios post here');
  }

  const expandMe = isExpanded ? "activities2 expanded" : "activities2";
  const expandMe2 = isExpanded ? "other-stuff-activities2 expanded2" : "other-stuff-activities2";
  return (
    <button className={expandMe} id="activities2" onClick={expand}>
      <div className = 'titlebar-wrapper-activities2'>
        <p className="groupname-activities2">
          {redux.store.getState().activities[index.props].name}
        </p>
        <p className = 'date-activities2'>{redux.store.getState().activities[index.props].date}</p>
      </div>
      <div className = {expandMe2}>
        <div className="wrapper-progress-activities2">
          <CircularProgress
            variant="static"
            value={redux.store.getState().activities[index.props].risk}
            size={"10vh"}
          />
          <p className="percentage-activities2">{`${
            redux.store.getState().activities[index.props].risk
          }%`}</p>
        </div>
        <button className = 'button-activities2' onClick = {removeActivity}>Remove This Activity</button>
      </div>
    </button>
  );
}
