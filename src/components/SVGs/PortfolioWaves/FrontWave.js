import React, { Component } from "react";
import classnames from "classnames";

export class FrontWave extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color1: "rgb(224, 53, 101, 0.99)",
      color2: "rgb(235,75,79, 0.99)",
    };
  }

  render() {
    const { pageVisted, showShadow } = this.props;
    const { color1, color2, withinRange } = this.state;

    return (
      <div className="frontWaveSVGWrapper">
        <svg
          className={classnames("frontWaveSVG", {
            showShadow: showShadow,
          })}
          viewBox="0 0 1332 445"
          style={{ enableBackground: "new 0 0 1332 445" }}
          preserveAspectRatio="none"
        >
          <path
            id="frontWavePath"
            d="M1105.5,31.5c-155.7,57.73-246.75,223.62-365,243c-150.07,24.6-305.69-171.62-487-188
	C185.08,80.32,90.17,118.42,16,210.34V435h1299.5V48.32C1253.88,7.82,1174.2,6.03,1105.5,31.5z"
          />

          <linearGradient
            // id="gradientHorizontal"
            id={`frontWaveGradient`}
            gradientTransform="rotate(90)"
          >
            <stop
              offset="30%"
              // stopColor={color1} />
              stopColor="var(--color-stop-1)"
            />
            <stop
              offset="70%"
              // stopColor={color2} />
              stopColor="var(--color-stop-2)"
            />
            {/* <stop
                        offset="300%"
                        // stopColor={color3} />
                        stopColor="var(--color-stop-3)" /> */}
          </linearGradient>
        </svg>
      </div>
    );
  }
}

export default FrontWave;
