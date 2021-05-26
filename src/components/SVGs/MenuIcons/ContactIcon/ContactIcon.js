import React, { Component } from "react";
import Lottie from "react-lottie";
import data from "./data.json";
import classnames from "classnames";
import "./ContactIcon.css";
import isEmpty from "../../../../is-empty";

var hideTimeouts = [];
export class ContactIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showIcon: false,
      drawStroke: false,
      hideIcon: true,
      stop: false,
      showTimeouts: [],
      // , hideTimeouts: []
    };

    // refs
    this.contactLottieRef = React.createRef();
  }

  componentDidMount() {
    // Show icon
    const { showIcon } = this.props;
    const { hideIcon, showIconHandled, drawStroke, showTimeouts } = this.state;
    if (showIcon && !showIconHandled && hideIcon) {
      this.setState(
        { showIconHandled: true },
        function () {
          this.setState(
            { hideIcon: false, stop: false },
            function () {
              setTimeout(
                function () {
                  this.setState({ drawStroke: true, showIconHandled: false });
                }.bind(this),
                100
              );
            }.bind(this)
          );
        }.bind(this)
      );
    }
  }

  componentDidUpdate() {
    const { showIcon } = this.props;
    const { hideIcon, showIconHandled, drawStroke, showTimeouts } = this.state;

    /*
            showIcon is the parent variable that determines whether the icon is showing or not.
            showIconHandled is for componentDidUpdate() to prevent an update loop.
            drawStroke var is responsible for drawing stroke,
            stop var is resposible for stopping the lottie anim,
            hideIcon var is resposnsible for hiding the icon.
            
            When showing:
            Unhide icon, start lottie anim, draw stroke.

            When hiding:
            Remove stroke, stop lottie anim, hide icon.
        */

    // Show icon
    if (showIcon && !showIconHandled && hideIcon) {
      this.setState(
        { showIconHandled: true },
        function () {
          this.setState(
            { hideIcon: false, stop: false },
            function () {
              setTimeout(
                function () {
                  this.setState({ drawStroke: true, showIconHandled: false });
                }.bind(this),
                100
              );
            }.bind(this)
          );
        }.bind(this)
      );
    }

    // if (showIcon && !showIconHandled) {
    //     while (!isEmpty(hideTimeouts)) window.clearTimeout(hideTimeouts.pop());
    //     this.setState({ showIconHandled: true, hideIcon: false, stop: false }, function () {
    //         var showTimeoutId = setTimeout(function () {
    //             this.setState({ drawStroke: true });
    //         }.bind(this), 100);
    //         showTimeouts.push(showTimeoutId);
    //         this.setState({ showTimeouts });
    //     }.bind(this))
    // }

    // Hide icon is also partially handled in onTransitionEnd
    if (!showIcon && !showIconHandled && !hideIcon) {
      // console.log("dont show")
      this.setState(
        { showIconHandled: true },
        function () {
          setTimeout(
            function () {
              if (this.props.showIcon) return this.setState({ showIconHandled: false });
              else this.setState({ drawStroke: false });
            }.bind(this),
            100
          );
        }.bind(this)
      );
    }
  }

  render() {
    // const { showIcon } = this.props;
    const { hideIcon, stop, drawStroke } = this.state;

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: data,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };

    return (
      <div
        className={classnames("contactIconDivWrapper", {
          contactIconDivDrawStroke: drawStroke,
          hideContactIcon: hideIcon,
        })}
        onTransitionEnd={function () {
          if (drawStroke === false) this.setState({ hideIcon: true, stop: true, showIconHandled: false });
        }.bind(this)}
      >
        <div className="contactIconDiv">
          <Lottie
            options={defaultOptions}
            // ref={this.contactLottieRef}
            // eventListeners={[
            //     {
            //         eventName: "enterFrame",
            //         callback: async function () {
            //             // console.log("portfolio lottie frame: ", this.contactLottieRef.current.anim.currentFrame);
            //             if (this.contactLottieRef.current.anim.currentFrame === 0) {
            //                 console.log("hide contact true");
            //                 // this.setState({ hideIcon: true });
            //             }
            //             else {
            //                 // this.setState({ hideIcon: false });
            //                 console.log("hide contact false");
            //             }
            //         }.bind(this)
            //     }]}

            // direction={direction}
            // height={400}
            // width={400}
            isStopped={stop}
            // isPaused={pause}
            // isPaused={this.state.isPaused}
            isClickToPauseDisabled={true}
          />
        </div>
      </div>
    );
  }
}

export default ContactIcon;
