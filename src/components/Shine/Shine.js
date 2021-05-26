import React, { Component } from "react";
import classnames from "classnames";
import "./Shine.css";

var duration = 0;

export class Shine extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    // refs
    this.shine = React.createRef();
    this.shinePositionAndOpacityRef = React.createRef();
    this.shineOpacity = React.createRef();
    this.shineWrapperRef = React.createRef();
  }

  componentDidMount() {
    const { index, maxWidth } = this.props;
    // console.log("index: ", index);

    // randomize position anim
    var animType = this.generateRandomInterval(3, 1);
    if (animType === 1) {
      this.setState({ positionAnim1: true });
    }
    if (animType === 2) {
      this.setState({ positionAnim2: true });
    }
    if (animType === 3) {
      this.setState({ positionAnim3: true });
    }

    // randomize anim delay
    var animDelaySec = this.generateRandomInterval(1, 0);
    var animDelayMillisec = this.generateRandomInterval(9, 0);
    this.shinePositionAndOpacityRef.current.style.animationDelay = `${0}.${animDelayMillisec}s`;
    this.shineOpacity.current.style.animationDelay = `${0}.${animDelayMillisec}s`;

    // var left = this.generateRandomInterval(5, 15) * index;

    var left = this.generateRandomInterval(maxWidth || 10, 1) * index;
    this.shineWrapperRef.current.style.left = `${left}px`;

    var sizeChance = this.generateRandomInterval(3, 0);
    // console.log("sizeChance: ", sizeChance);
    if (sizeChance === 1) {
      this.setState({ shineShadowBigger: true });
    } else if (sizeChance === 2) {
      this.setState({ shineShadowSmaller: true });
    } else if (sizeChance === 3) {
      this.setState({ shineShadowEvenSmaller: true });
    }

    duration = this.generateRandomInterval(8, 3);
    // this.setState({ duration });
    this.shinePositionAndOpacityRef.current.style.animationDuration = `${duration}s`;
    this.shineOpacity.current.style.animationDuration = `${duration}s`;

    var delay = duration * 1000;
    setTimeout(
      function () {
        this.setState({ durationNeedsUpdate: true });
      }.bind(this),
      delay
    );
  }

  generateRandomInterval(max, min) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  componentDidUpdate() {
    // var { durationNeedsUpdate } = this.state;
    // var delay = duration * 1000;
    // if (false) {
    //     // if (durationNeedsUpdate) {
    //     this.setState({ durationNeedsUpdate: false });
    //     setTimeout(() => {
    //         duration = this.generateRandomInterval(8, 3);
    //         this.setState({ durationNeedsUpdate: true });
    //         this.shinePositionAndOpacityRef.current.style.animationDuration = `${duration}s`;
    //         this.shineOpacity.current.style.animationDuration = `${duration}s`;
    //     }, delay);
    // }
    // console.log("shine update");
  }

  render() {
    const { shineShadowBigger, shineShadowSmaller, shineShadowEvenSmaller, positionAnim1, positionAnim2, positionAnim3 } = this.state;

    return (
      <div ref={this.shineWrapperRef} className="shineWrapper">
        <div
          ref={this.shinePositionAndOpacityRef}
          className={classnames("shinePositionAndOpacity", {
            shinePositionBigger: shineShadowBigger,
            positionAnimVer1: positionAnim1,
            positionAnimVer2: positionAnim2,
            positionAnimVer3: positionAnim3,
          })}
        >
          <div ref={this.shineOpacity} className="shineOpacity">
            <div
              ref={this.shine}
              className={classnames("shineShadow", {
                shineShadowBigger: shineShadowBigger,
                shineShadowSmaller: shineShadowSmaller,
                shineShadowEvenSmaller: shineShadowEvenSmaller,
              })}
            ></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Shine;
