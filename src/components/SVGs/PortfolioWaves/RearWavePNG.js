import React, { Component } from "react";
import "./RearWavePNG.css";
import classnames from "classnames";

class RearWavePNG extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { showShadow } = this.state;

    return (
      <div
        className={classnames("rearWavePNGWrapper", {
          showShadow: showShadow,
        })}
        onTransitionEnd={function () {
          if (!showShadow) this.setState({ showShadow: true });
        }.bind(this)}
      >
        <img src="./images/backgroundWaves/rearWave.png" className="rearWavePNG" alt="rearWavePNG"></img>
        <img src="./images/backgroundWaves/rearWaveGlow.png" className="rearWavePNG rearWavePNGGlow" alt="rearWavePNGGlow"></img>
      </div>
    );
  }
}

export default RearWavePNG;
