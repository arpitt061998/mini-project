import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";

const ProgressContainer = () => {

  const [value, setValue] = useState(0);
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setValue((val) => 
        val + 1
      );
    }, 100);
    return () => clearInterval(intervalId);
  }, []);

  const checkStatus = () => {
    setSuccess(true)
  }

  return (
    <div className="progress-container">
      <div className="progress-title">Progress Bar</div>
      <ProgressBar value = {value} checkStatus = {checkStatus}/>
      <div className="success">{success ? "Completed !" : "Loading..."}</div>
    </div>
  )
}

export default ProgressContainer;