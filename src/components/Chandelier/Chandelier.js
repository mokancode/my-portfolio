import React, { Component } from "react";
import "./Chandelier.scss";
import classnames from "classnames";
import ChandelierItem from "./ChandelierItem";
import isEmpty from "../../is-empty";
import { v4 as uuidv4 } from "uuid";

export class Chandelier extends Component {
  constructor(props) {
    super(props);
    this.state = { lines: [] };
  }

  componentDidMount() {
    var { pageVisited } = this.props;

    var lines = [];
    for (var i = 0; i < 24; i++) {
      lines.push(<ChandelierItem index={i} pageVisited={pageVisited} key={uuidv4()} />);
    }

    this.setState({ lines });

    const { reveal } = this.state;
    if (!reveal && this.props.reveal)
      setTimeout(
        function () {
          this.setState({ reveal: true });
        }.bind(this),
        500
      );
  }

  componentDidUpdate() {
    const { reveal } = this.state;
    if (!reveal && this.props.reveal)
      setTimeout(
        function () {
          this.setState({ reveal: true });
        }.bind(this),
        10
      );
  }

  render() {
    const { lines, reveal } = this.state;

    return (
      // <Tilt className="tiltChandelier" options={
      //     {
      //         max: 10
      //         , scale: 1
      //         , axis: "x"
      //         // , speed: 2000
      //         , transition: true
      //         , easing: "cubic-bezier(0.37, 0, 0.63, 1)"
      //         // , reset: true
      //     }
      // }>
      <div
        className={classnames("chandelierDiv", {
          chandelierDivReveal: reveal,
        })}
      >
        {/* {!isEmpty(lines) && reveal ? lines : null} */}
        {!isEmpty(lines) &&
          lines.map(
            function (line) {
              return React.cloneElement(line);
            }.bind(this)
          )}
      </div>
      // </Tilt>
    );
  }
}

export default Chandelier;
