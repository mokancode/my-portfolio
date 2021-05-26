import React, { Component } from "react";
import Lottie from "react-lottie";
import data from "./data.json";

class PageNotFoundCursiveLottie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStopped: true,
    };
  }

  componentDidMount() {
    const animData = JSON.parse(JSON.stringify(data));
    this.setState({ animData });

    var timeoutId = setTimeout(
      function (e) {
        this.setState({ isStopped: false });
      }.bind(this),
      500
    );
  }

  render() {
    const { direction, isStopped, hideIcon, animData } = this.state;

    const defaultOptions = {
      loop: false,
      autoplay: false,
      animationData: animData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };

    return (
      <div className="pageNotFoundCursiveLottie">
        <Lottie options={defaultOptions} isStopped={isStopped} isClickToPauseDisabled={true} />
      </div>
    );
  }
}

export default PageNotFoundCursiveLottie;
