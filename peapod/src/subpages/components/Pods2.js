import React from "react";
import "./Pods2.css";
import redux from "../../index";
import CircularProgress from "@material-ui/core/CircularProgress";

export const Pods2 = (index) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const expand = (index) => {
    setIsExpanded(!isExpanded);
  };

  const removePod = () => {
    console.log('axios post here');
  }

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
            value={0/*redux.store.getState().pods[index.props].maxValue*/}
            size={"5vh"}
          />
          <p className="percentage-pods2">{0/*`${redux.store.getState().pods[index.props].maxValue
            }%`*/}</p>
        </div>
      </div>
      <div className={expandMe2}>

        <button className='button-pods2' onClick={removePod}>Remove This Pod</button>
      </div>
    </button>
  );
};

