import React, { Component } from "react";
import Shine from "./Shine";
import classnames from "classnames";
import { v4 as uuidv4 } from "uuid";

export class ShineGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate() {
    // console.log(this.state.withinRange);
  }

  componentDidMount() {
    const { amount, maxWidth } = this.props;
    var shines = [];
    for (var s = 0; s < amount; s++) {
      shines.push(<Shine key={uuidv4()} index={s} maxWidth={maxWidth} />);
    }
    this.setState({ shines });
  }

  render() {
    const { withinRange, shines } = this.state;
    const { readyToLoad } = this.props;

    return (
      // <Waypoint
      //     onEnter={function (e) { this.setState({ withinRange: true }) }.bind(this)}
      //     onLeave={function (e) { this.setState({ withinRange: false }) }.bind(this)}
      //     scrollableAncestor={window}
      //     bottomOffset='10px'
      //     topOffset='10px'

      // >
      <div
        className={classnames("shineGroup", {
          shineGroupVisible: withinRange,
        })}
      >
        {shines && readyToLoad ? shines : null}
      </div>
      // </Waypoint>
    );
  }
}

export default ShineGroup;
