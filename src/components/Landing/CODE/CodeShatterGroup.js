import React, { Component } from "react";
import "./CodeShatterGroup.scss";
import "./CodeShatterGroupMobile.css";
import CodeLetterC_TopLeft from "./CodeLetterC/CodeLetterC_TopLeft";
import CodeLetterC from "./CodeLetterC/CodeLetterC";
import CodeLetterO from "./CodeLetterO/CodeLetterO";
import CodeLetterD from "./CodeLetterD/CodeLetterD";
import CodeLetterE from "./CodeLetterE/CodeLetterE";
import classnames from "classnames";
import { connect } from "react-redux";

class CodeShatterGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.notifyRevealEnded = this.notifyRevealEnded.bind(this);
    this.codeShatterRevealEnded = this.props.codeShatterRevealEnded;
  }

  componentDidMount() {
    // 0 = Reveal immediately.
    // 1 = Reveal delayed.

    const { reveal } = this.props;
    if (reveal === 0)
      setTimeout(
        function () {
          this.setState({ reveal: true });
        }.bind(this),
        10
      );
    else if (reveal === 1)
      setTimeout(
        function () {
          this.setState({ reveal: true });
        }.bind(this),
        10
      );
  }

  componentDidUpdate() {
    const { reveal } = this.props;
    const { documentHasFocus } = this.props.styles;

    if (!this.state.reveal && documentHasFocus) {
      setTimeout(
        function () {
          this.setState({ reveal: true });
        }.bind(this),
        10
      );
    } else if (reveal === 1)
      setTimeout(
        function () {
          this.setState({ reveal: true });
        }.bind(this),
        10
      );
  }

  notifyRevealEnded() {
    this.setState({ revealEnded: true });
    this.codeShatterRevealEnded();
  }

  render() {
    const { animate, revealEnded, reveal, toggleGlow } = this.state;

    return (
      <div
        className={classnames("codeShatterOuterWrapper", {
          toggleGlow: revealEnded,
        })}
      >
        {/* <div className="btnsContainer">
                    <button className="animateBtn" onClick={function () {
                        this.setState(function (prevState) {
                            return {
                                reveal: !this.state.reveal
                            }
                        }.bind(this))
                    }.bind(this)}
                        disabled={reveal || revealEnded}
                    >Reveal</button>

                    <button className="animateBtn" onClick={function () {
                        this.setState(function (prevState) {
                            return {
                                animate: !this.state.animate
                            }
                        }.bind(this))
                    }.bind(this)}
                        disabled={animate || !revealEnded}
                    >Animate</button>
                </div> */}

        <CodeLetterC animate={animate} reveal={reveal} />
        <CodeLetterO animate={animate} reveal={reveal} letterIndex={1} />
        <CodeLetterD animate={animate} reveal={reveal} letterIndex={2} />
        <CodeLetterE animate={animate} reveal={reveal} letterIndex={3} notifyRevealEnded={this.notifyRevealEnded} />

        <div className="codeShatterGroupByWrapper">
          <p
            className={classnames("codeShatterGroupBy", {
              codeShatterGroupByReveal: revealEnded,
            })}
          >
            By
          </p>
        </div>

        {/* <svg className="codeShatterTemp" viewBox="0 0 141.28 143.51">
                    <g>
                    </g>
                </svg> */}
      </div>
    );
  }
}

const mapStateToProps = function (state) {
  return {
    styles: state.styles,
  };
};

export default connect(mapStateToProps, {})(CodeShatterGroup);
