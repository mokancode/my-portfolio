import React, { Component } from "react";
import FingerPointer from "../SVGs/FingerPointer/FingerPointer";
import "./FingerPointerMotionBlur.scss";
import classnames from "classnames";
import { useSwipeable, Swipeable } from "react-swipeable";
import { connect } from "react-redux";
import { setFingerPointerMotionBlurDismissed } from "../../actions/stylesActions";
import LEDStrip from "../LEDStrip/LEDStrip";
import { v4 as uuidv4 } from "uuid";

class FingerPointerMotionBlur extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fingerPointers: [],
    };

    this.notifyLEDStripsAreOff = this.notifyLEDStripsAreOff.bind(this);
    this.notifyLEDSsLoaded = this.notifyLEDSsLoaded.bind(this);
  }

  componentDidMount() {
    var fingerPointers = [];
    for (var i = 0; i < 20; i++) {
      fingerPointers.push(
        <div key={uuidv4()} className="fingerWrapper" style={{ animationDelay: `${i * 0.01}s`, opacity: `${0.5 / i}` }}>
          <FingerPointer />
        </div>
      );
    }
    this.setState({ fingerPointers });

    setTimeout(
      function () {
        this.setState({ showFingerInstruction: true });
      }.bind(this),
      10
    );
  }

  componentDidUpdate() {
    const { isTouchScreen } = this.props.styles;
    const { showFingerInstruction } = this.state;
    if (isTouchScreen && !this.state.isTouchScreen) this.setState({ isTouchScreen: true });
  }

  notifyLEDStripsAreOff() {
    this.setState({ LEDStripsAreOff: true });
  }

  notifyLEDSsLoaded() {
    this.setState({ LEDsLoaded: true });
  }

  render() {
    const {
      fingerPointers,
      instructionDismissed,
      showFingerInstruction,
      isTouchScreen,
      displayNone,
      fingerLoaded,
      LEDStripsAreOff,
      opacityOff,
      LEDsLoaded,
    } = this.state;

    return (
      <div
        className={classnames("W_SliderFingerInstructionDivWrapper", {
          W_SliderFingerInstructionDivWrapperShow: showFingerInstruction && isTouchScreen,
          W_SliderFingerInstructionDivWrapperDismissed: opacityOff && LEDStripsAreOff,
          W_SliderFingerInstructionDivWrapperDisplayNone: displayNone,
        })}
        onClick={function (e) {
          // console.log("click");
          if (!LEDsLoaded) return;
          this.setState({ instructionDismissed: true });
        }.bind(this)}
        onTransitionEnd={function (e) {
          if (showFingerInstruction && !fingerLoaded) this.setState({ fingerLoaded: true });
          if (instructionDismissed && LEDStripsAreOff && !opacityOff) {
            // console.log("setting finger opacity off");
            this.setState({ opacityOff: true });
          }
          if (instructionDismissed && LEDStripsAreOff && opacityOff && !displayNone) {
            // console.log("opacity is off, set display off now")
            this.setState({ displayNone: true });
            this.props.setFingerPointerMotionBlurDismissed(true);
          }
        }.bind(this)}
      >
        {!displayNone ? (
          <Swipeable
            className="W_SliderFingerInstructionDivInnerWrapper"
            onSwiped={function (eventData) {
              // console.log("swipe", eventData);
              // console.log("swipe");
              eventData.event.stopPropagation();
              if (!LEDsLoaded) return;
              this.setState({ instructionDismissed: true });
            }.bind(this)}
            // {...config}
          >
            <div className="W_SliderFingerInstructionDiv">
              <div className="swipeLine">{fingerPointers}</div>
            </div>
            <p>Browse by swiping or pressing the buttons below</p>
          </Swipeable>
        ) : null}
        <LEDStrip
          parentLoaded={fingerLoaded}
          instructionDismissed={instructionDismissed}
          notifyLEDStripsAreOff={this.notifyLEDStripsAreOff}
          notifyLEDSsLoaded={this.notifyLEDSsLoaded}
        />
        <LEDStrip
          parentLoaded={fingerLoaded}
          instructionDismissed={instructionDismissed}
          notifyLEDStripsAreOff={this.notifyLEDStripsAreOff}
          notifyLEDSsLoaded={this.notifyLEDSsLoaded}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    styles: state.styles,
  };
}

export default connect(mapStateToProps, { setFingerPointerMotionBlurDismissed })(FingerPointerMotionBlur);
// export default FingerPointerMotionBlur;
