import React, { Component } from "react";

class RotatingStrokeText extends Component {
  constructor(props) {
    super(props);

    this.notifyRotateAnimEnded = this.props.notifyRotateAnimEnded;
  }

  render() {
    const { text } = this.props;

    return (
      <div className="rotatingStrokeTextDiv">
        <svg
          onAnimationEndCapture={function () {
            if (this.notifyRotateAnimEnded) this.notifyRotateAnimEnded();
          }.bind(this)}
        >
          <defs>
            <linearGradient id="rotatingTextGradient" x1="0%" y1="0%" x2="100%" y2="0%" gradientTransform="rotate(90)">
              <stop offset="60%" stopColor="var(--color-stop-1)" />
              <stop offset="80%" stopColor="var(--color-stop-2)" />
            </linearGradient>
          </defs>
          <text x="4" y="32" stroke={"url(#rotatingTextGradient)"}>
            {text}
          </text>
        </svg>
      </div>
    );
  }
}

export default RotatingStrokeText;
