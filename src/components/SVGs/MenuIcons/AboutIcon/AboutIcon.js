import React, { Component } from "react";
import anime from "animejs";
import classnames from "classnames";
import "./AboutIcon.css";
import { connect } from "react-redux";

export class AboutIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animeObj: anime.timeline({
        // duration: 250,
        // easing: 'easeInOutQuart',
        autoplay: false,
        loop: true,
      }),
      displayIcon: false,
      hideIcon: true,
    };

    this.notifyIconHidden = this.props.notifyIconHidden;
  }

  componentDidMount() {
    const { animeObj } = this.state;

    let t1 = animeObj;

    t1.add({
      targets: [".aboutIconPath", "feTurbulence", "feDisplacementMap"],
      baseFrequency: 0.01,
      numOctaves: 2,
      scale: 50,
      duration: 700,
    })
      .add({
        targets: [".aboutIconPath", "feTurbulence", "feDisplacementMap"],
        baseFrequency: 0,
        numOctaves: 0,
        scale: 0,
        duration: 20,
      })
      .add({
        targets: [".aboutIconPath", "feTurbulence", "feDisplacementMap"],
        baseFrequency: 0.01,
        numOctaves: 3,
        scale: 150,
        duration: 20,
      })
      .add({
        targets: [".aboutIconPath", "feTurbulence", "feDisplacementMap"],
        baseFrequency: 0,
        numOctaves: 0,
        scale: 0,
        duration: 200,
      })
      .add({
        targets: [".aboutIconPath", "feTurbulence", "feDisplacementMap"],
        baseFrequency: 0.02,
        numOctaves: 2,
        scale: 150,
        duration: 200,
      })
      .add({
        targets: [".aboutIconPath", "feTurbulence", "feDisplacementMap"],
        baseFrequency: 0,
        numOctaves: 0,
        scale: 0,
        duration: 200,
      })
      .add({
        targets: [".aboutIconPath", "feTurbulence", "feDisplacementMap"],
        baseFrequency: 0,
        numOctaves: 0,
        scale: 0,
        duration: 1500,
      });

    const { showIcon } = this.props;
    const { browserName } = this.props.styles;
    const { displayIcon, hideIcon } = this.state;

    // New approach
    if (showIcon && !this.state.showIconHandled && hideIcon) {
      this.setState(
        { showIconHandled: true },
        function () {
          this.setState(
            { hideIcon: false },
            function () {
              setTimeout(
                function () {
                  if (browserName === "chrome") {
                    animeObj.play();
                  }
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
    const { animeObj, displayIcon, hideIcon } = this.state;
    const { browserName } = this.props.styles;

    // New approach
    if (showIcon && !this.state.showIconHandled && hideIcon) {
      this.setState(
        { showIconHandled: true },
        function () {
          this.setState(
            { hideIcon: false },
            function () {
              setTimeout(
                function () {
                  if (browserName === "chrome") animeObj.play();
                  this.setState({ drawStroke: true, showIconHandled: false });
                }.bind(this),
                100
              );
            }.bind(this)
          );
        }.bind(this)
      );
    } else if (!showIcon && !this.state.showIconHandled && !hideIcon) {
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

    const { forceStopTurbulence } = this.props;
    if (forceStopTurbulence) {
      // console.log("force stopped");
      if (browserName === "chrome") animeObj.pause();
    }

    /*
            Having the animation run in a loop creates a continuous error in numOctaves where a non-integer
            value is erroneous. Hence the code below runs the animation only when the user hovers over the navbar item, and stops the animation
            by reversing it to its first frame (using the seek function to the frame at 0ms), and then pausing it 500ms later (about the amount of time it takes
            for the stroke-dashoffset to hide the icon).
        */

    // if (showIcon && !displayIcon) {
    //     this.setState({ displayIcon: true }, function () {
    //         setTimeout(function () {
    //             animeObj.play();
    //         }.bind(this), 200);

    //     }.bind(this));
    // }
    // else if (showIcon === false && displayIcon) {
    //     animeObj.seek(0);
    //     animeObj.pause();

    //     setTimeout(function () {
    //         this.setState({ displayIcon: false });
    //     }.bind(this), 1000);
    // }
  }

  componentWillUnmount() {
    const { animeObj } = this.state;
    animeObj.pause();
    // console.log("about icon unmount");
  }

  render() {
    const { showIcon } = this.props;
    const { displayIcon, animeObj, hideIcon, drawStroke } = this.state;
    const { browserName } = this.props.styles;

    return (
      <svg
        className={classnames("aboutIconSVG", {
          showIcon: drawStroke,
          hideAboutIcon: hideIcon,
        })}
        version="1.1"
        x="0px"
        y="0px"
        viewBox="0 0 500 717"
        style={{ enableBackground: "new 0 0 500 717" }}
        onTransitionEnd={function () {
          if (drawStroke === false) {
            if (browserName === "chrome") {
              animeObj.seek(0);
              animeObj.pause();
            }
            this.setState({ hideIcon: true, showIconHandled: false });
            try {
              if (this.notifyIconHidden) this.notifyIconHidden();
            } catch (err) {
              // console.log("about icon err: ", err);
            }
          }
        }.bind(this)}
      >
        <filter id="displacementFilter">
          <feTurbulence type="turbulence" baseFrequency="0" numOctaves="0" result="turbulence" />
          <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="0" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        <g>
          <path
            style={{ filter: "url(#displacementFilter)" }}
            className="aboutIconPath path1"
            d="M234.72,31c31.52,0,61.15,12.27,83.44,34.56s34.56,51.92,34.56,83.44s-12.27,61.15-34.56,83.44S266.24,267,234.72,267
            s-61.15-12.27-83.44-34.56s-34.56-51.92-34.56-83.44s12.27-61.15,34.56-83.44S203.2,31,234.72,31 M234.72,30
            c-65.72,0-119,53.28-119,119s53.28,119,119,119s119-53.28,119-119S300.44,30,234.72,30L234.72,30z"
          />
        </g>
        <path
          style={{ filter: "url(#displacementFilter)" }}
          className="aboutIconPath path2"
          d="M71.22,329.5c34-49,303.17-46.6,330,7c11.76,23.48-13.74,293.5-100,331c-23,10-122,10-141,1
            C103.26,641.52,47.22,412.5,71.22,329.5z"
        />
        <g>
          <path
            style={{ filter: "url(#displacementFilter)" }}
            className="aboutIconPath path3"
            d="M190.72,422.84l-80.27-33.63v-10.37l80.27-33.71v12.43l-64.6,26.5l64.6,26.34V422.84z"
          />
          <path
            style={{ filter: "url(#displacementFilter)" }}
            className="aboutIconPath path4"
            d="M253.37,331.07h12.17l-51.99,105.54h-12.17L253.37,331.07z"
          />
          <path
            style={{ filter: "url(#displacementFilter)" }}
            className="aboutIconPath path5"
            d="M276.2,345.13l80.27,33.71v10.37l-80.27,33.63V410.4l64.6-26.34l-64.6-26.5V345.13z"
          />
        </g>
      </svg>
    );
  }
}

function mapStateToProps(state) {
  return {
    styles: state.styles,
  };
}

export default connect(mapStateToProps, {})(AboutIcon);
// export default AboutIcon;
