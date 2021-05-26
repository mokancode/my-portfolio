import React, { Component } from "react";
import "./LEDStrip.css";
import classnames from "classnames";
import LEDLight from "./LEDLight";
import { v4 as uuidv4 } from "uuid";
import isEmpty from "../../is-empty";

class LEDStrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfLEDs: 9,
    };

    this.notifyLEDStripsAreOff = this.props.notifyLEDStripsAreOff;
    this.notifyLEDSsLoaded = this.props.notifyLEDSsLoaded;
  }

  componentDidMount() {
    setTimeout(
      function () {
        this.setState({ lightUpStrip: true });
      }.bind(this),
      50
    );

    var uniqueIDs = [];
    for (var i = 0; i < this.state.numberOfLEDs; i++) {
      uniqueIDs.push(uuidv4());
    }
    this.setState({ uniqueIDs });
  }

  render() {
    const { parentLoaded, instructionDismissed } = this.props;
    const { lightUpStrip, numberOfLEDs, uniqueIDs } = this.state;

    return (
      <div
        className={classnames("LEDStripContainer", {
          lightUp: lightUpStrip && parentLoaded && !instructionDismissed,
        })}
      >
        {/* <button className="LEDToggleBtn"
                    onClick={function (e) {
                        this.setState(function (prevState) {
                            return {
                                lightUpStrip: !prevState.lightUpStrip
                            }
                        }.bind(this))
                    }.bind(this)}
                >{lightUpStrip ? "OFF" : "ON"}</button> */}
        <div className="LEDStripWrapper">
          {!isEmpty(uniqueIDs) &&
            new Array(numberOfLEDs).fill(undefined).map(
              function (val, idx) {
                return (
                  <LEDLight
                    key={uniqueIDs[idx]}
                    idx={idx}
                    numberOfLEDs={numberOfLEDs}
                    instructionDismissed={instructionDismissed}
                    notifyLEDStripsAreOff={this.notifyLEDStripsAreOff}
                    notifyLEDSsLoaded={this.notifyLEDSsLoaded}
                  />
                );
              }.bind(this)
            )}
        </div>
      </div>
    );
  }
}

export default LEDStrip;
