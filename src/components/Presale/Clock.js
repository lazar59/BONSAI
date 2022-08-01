import React, { Component } from "react";
import { getUTCNow } from '../utils';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      daysPer: 0,
      hoursPer: 0,
      minPer: 0,
      secPer: 0
    };
  }
  componentDidMount() {
    this.getTimeUntil(this.props.deadline, this.props.deadline - this.props.startTime);
    setInterval(() => this.getTimeUntil(this.props.deadline, this.props.deadline - this.props.startTime), 1000);
  }
  leading0(num) {
    return num < 10 ? "0" + num : num;
  }
  getTimeUntil(deadline, duration) {
    const time = deadline - getUTCNow();
    let diffDays = Math.floor(duration / (1000 * 60 * 60 * 24));

    if (time < 0) {
      this.setState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    } else {
      const seconds = Math.floor((time / 1000) % 60);
      const minutes = Math.floor((time / 1000 / 60) % 60);
      const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
      const days = Math.floor(time / (1000 * 60 * 60 * 24));

      const daysPer = Math.floor((days / diffDays) * 100);
      const hoursPer = Math.floor((hours / 24) * 100);
      const minPer = Math.floor((minutes / 60) * 100);
      const secPer = Math.floor((seconds / 60) * 100);
      this.setState({ days, hours, minutes, seconds, daysPer, hoursPer, minPer, secPer });
    }
  }
  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
      return;
    };
  }
  render() {
    return (
      <div className="d-flex justify-evenly mt-3">
        <div className="Clock-item">
          <span className="clock-time">{this.leading0(this.state.days)}</span>
          <span className="clock-text">Days</span>
        </div>
        <div className="Clock-item Clock-item-ex">
          <span className="clock-time">{this.leading0(this.state.hours)}</span>
          <span className="clock-text">HRS</span>
        </div>
        <div className="Clock-item">
          <span className="clock-time">{this.leading0(this.state.minutes)}</span>
          <span className="clock-text">MINS</span>
        </div>
        <div className="Clock-item Clock-item-ex">
          <span className="clock-time">{this.leading0(this.state.seconds)}</span>
          <span className="clock-text">SEC</span>
        </div>
      </div>
    );
  }
}
export default Clock;
