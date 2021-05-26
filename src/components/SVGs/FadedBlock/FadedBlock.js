import React, { Component } from "react";
import classnames from "classnames";
import "./FadedBlock.css";

export class FadedBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    // refs
    this.overWrapperRef = React.createRef();
    this.wrapperRef = React.createRef();
  }

  componentDidMount() {
    const { index } = this.props;

    var left = index * 250;

    this.overWrapperRef.current.style.left = `${left}px`;

    if (index % 2 == 0 && index > 0) {
      this.overWrapperRef.current.style.top = `${200}px`;
    } else if (index % 3 === 0) {
      this.overWrapperRef.current.style.top = `${60}px`;
    }

    if (index % 3 === 0) {
      this.overWrapperRef.current.style.transform = `scale(.5,.5)`;
    }

    // Random appearance delay
    var msDelay = this.generateRandomInterval(9, 1);
    this.wrapperRef.current.style.transitionDelay = `.${msDelay}s`;

    setTimeout(
      function () {
        this.setState({ showFadedBlock: true });
      }.bind(this),
      500
    );
  }

  generateRandomInterval(max, min) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  render() {
    const { showFadedBlock } = this.state;
    const { readyToLoad } = this.props;

    return (
      <div ref={this.overWrapperRef} className="fadedBlockOverWrapper">
        <div
          ref={this.wrapperRef}
          className={classnames("fadedBlockWrapper", {
            fadedBlockWrapperAppear: showFadedBlock && readyToLoad,
          })}
        >
          <div className="fadedBlock"></div>
        </div>
      </div>
    );
  }
}

export default FadedBlock;
