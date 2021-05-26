import React, { Component } from "react";
import Lottie from "react-lottie";
import data from "./LocationIcon2.json";
import "./LocationIcon.css";
import isEmpty from "../../../../../is-empty";

class LocationIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStopped: true,
      pause: true,
    };

    this.locationIconLottieRef = React.createRef();
  }

  componentDidMount() {
    const animData = JSON.parse(JSON.stringify(data));
    this.setState({ animData }, function () {}.bind(this));
  }

  componentDidUpdate() {
    if (this.props.show && !isEmpty(this.locationIconLottieRef.current.anim) && this.state.pause) {
      setTimeout(
        function () {
          this.setState({ pause: false });
          this.locationIconLottieRef.current.anim.playSegments(
            [
              // For speed .5
              [0, 177],
              [176, 296],

              // For speed 1
              // [0, 167],
              // [177, 298]
            ],
            true
          );
        }.bind(this),
        10 + this.props.showDelay
      );
      // console.log(JSON.stringify(this.locationIconLottieRef.current.anim));
      // console.log(util.inspect(this.locationIconLottieRef.current.anim));
    }
  }

  render() {
    const { isStopped, hideIcon, animData, pause } = this.state;

    const defaultOptions = {
      loop: true,
      autoplay: false,
      animationData: animData,
      rendererSettings: {
        preserveAspectRatio: "none",
      },
    };

    return (
      <div className="locationIconLottie">
        <Lottie
          ref={this.locationIconLottieRef}
          speed={0.5}
          // eventListeners={[
          //     {
          //         eventName: "enterFrame",
          //         callback: async function () {
          //             // console.log("locationIcon lottie frame: ", this.locationIconLottieRef.current.anim.currentFrame);
          //             if (this.locationIconLottieRef.current.anim.currentFrame === 0) this.setState({ hideIcon: true });
          //             else this.setState({ hideIcon: false });
          //         }.bind(this)
          //     },
          //     // {
          //     //     eventName: "complete",
          //     //     callback: async function () {
          //     //         if (this.locationIconLottieRef.current.anim.currentFrame > 0)
          //     //             console.log("locationIcon onComplete");
          //     //     }.bind(this)
          //     // }

          // ]}

          options={defaultOptions}
          // direction={direction}
          // direction={showIcon ? 1 : -1}
          // height={400}
          // width={400}
          // isStopped={isStopped}
          isPaused={pause}
          // isPaused={this.state.isPaused}
          isClickToPauseDisabled={true}
        />
      </div>
    );
  }
}

export default LocationIcon;
