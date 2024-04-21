import { useEffect, useState } from "react";
import "./Progress.css";

const ProgressBar = ({value = 0, checkStatus}) => {

  const [percent, setPercent] = useState(0);
  const MIN = 0;
  const MAX = 100

  useEffect(()=> {
    setPercent(Math.min(MAX, Math.max(MIN, value.toFixed())))
    if (value >= MAX) {
      checkStatus();
    }
  },[value]);

  return (
    <div className="progress">
      <span style={{color : (percent > 49 ? "white": "black")}}>{`${percent}%`}</span>
      <div className="progress-bar" style={{
        transform: `scaleX(${percent/100})`,
        transformOrigin: "left"
        }}
        aria-valuemin={MIN}
        aria-valuemax={MAX}
        aria-valuenow={percent}
        role="progressbar"
        ></div>
    </div>
  )
};

export default ProgressBar;