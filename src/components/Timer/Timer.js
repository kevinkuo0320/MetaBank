import React from "react";
import { Form, Button } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";
import CountDownTimer from "./Countdown";

function Timer() {
    const hoursMinSecs = { hours: 48, minutes: 59, seconds: 59 };

    return <div className="Timer">{/*<CountDownTimer hoursMinSecs={hoursMinSecs} />*/}1 APRIL 2022, 9AM EST</div>;
}

export default Timer;
