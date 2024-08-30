import React from "react";
import { useDispatch } from "react-redux";
import { useTimer } from "react-timer-hook";
import { handle_variables } from "./Redux/authSlice";

function MyTimer({ expiryTimestamp }) {
  const dispatch = useDispatch();

  const { seconds,minutes,isRunning } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  return (
    <div
      style={{ display: "flex", flexDirection: "column", textAlign: "center" }}
    >
      <div className="d-flex justify-content-center align-items-center" style={{ fontSize: "20px" }}>
      <span style={{ fontSize: "16px" }} >مدت زمان باقی مانده : </span>
      <div className="me-2">
        <span>{minutes.toString().padStart(2,"0")}</span>:<span>{seconds.toString().padStart(2,"0")}</span>
        </div>
      </div>
      {isRunning ? null : (
        <div
          onClick={() => {
            dispatch(
              handle_variables({
                loginModalStep2: false,
                loginModalStep1: true,
                isSendCode: false,
              })
            );
          }}
          style={{
            color: "blue",
            textDecoration: "underline",
            fontSize: "15px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          ارسال مجدد کد فعالسازی یا ویرایش شماره همراه
        </div>
      )}
    </div>
  );
}

function Timer() {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 119); // 10 minutes timer
  return (
    <div>
      <MyTimer expiryTimestamp={time} />
    </div>
  );
}

export default Timer;
