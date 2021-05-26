import React, { Component } from "react";
import "./RepeaterExplosionMotionGraphic.css";
import classnames from "classnames";
import { v4 as uuidv4 } from "uuid";
import isEmpty from "../../is-empty";

class RepeaterExplosionMotionGraphic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numOfLines: 8,
    };

    this.setRepeaterExplosionMotionGraphicAnimated = this.props.setRepeaterExplosionMotionGraphicAnimated;
  }

  componentDidMount() {
    const { numOfLines } = this.state;

    var uniqueIDs = [];
    for (var i = 0; i < numOfLines; i++) {
      uniqueIDs.push(uuidv4());
    }
    this.setState({ uniqueIDs });
  }

  componentDidUpdate() {
    const { animate, repeaterExplosionMotionGraphicAnimated } = this.props;
    if (animate && !this.state.animate && !repeaterExplosionMotionGraphicAnimated) {
      setTimeout(
        function () {
          this.setState({ animate: true });
        }.bind(this),
        10
      );
    }
  }

  render() {
    const { numOfLines, animate, uniqueIDs } = this.state;

    return (
      <div
        className={classnames("repeaterExplosionMotionGraphicDiv", {
          animateRepeaterExplosionMotionGraphic: animate,
        })}
      >
        {!isEmpty(uniqueIDs) &&
          new Array(numOfLines).fill(undefined).map(
            function (repeaterLine, index) {
              return (
                <div
                  className="repeaterLineWrapper"
                  key={uniqueIDs[index]}
                  style={{ transform: `rotate(${(360 / numOfLines) * (index + 1)}deg)` }}
                >
                  <div
                    className="repeaterLine"
                    onTransitionEnd={function (e) {
                      e.stopPropagation();
                    }}
                    onAnimationEnd={function (e) {
                      e.stopPropagation();
                      if (animate) {
                        // console.log("anim end");
                        this.setState({ animate: false });
                        this.setRepeaterExplosionMotionGraphicAnimated(true);
                      }
                    }.bind(this)}
                  ></div>
                </div>
              );
            }.bind(this)
          )}
      </div>
    );
  }
}

export default RepeaterExplosionMotionGraphic;
