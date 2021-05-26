import React, { Component } from "react";
import "./ResumePageButton.css";
import classnames from "classnames";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import isEmpty from "../../../is-empty";

class ResumePageButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    var uniqueIDs = [];
    for (var i = 0; i < "Resume".split("").length; i++) {
      uniqueIDs.push(uuidv4());
    }
    this.setState({ uniqueIDs });

    setTimeout(
      function () {
        this.setState({ revealBtn: true });
      }.bind(this),
      10
    );
  }

  render() {
    const { revealBtn, revealText, uniqueIDs } = this.state;
    const { currentPage } = this.props.navbar;
    const { isWorkItemOpen, isMiscWorkItemOpen } = this.props.styles;

    if (isEmpty(uniqueIDs)) return null;

    return (
      <div
        className={classnames("resumePageBtn", {
          reveal: revealBtn,
          revealText: revealText,
          hide: currentPage === "resume" || isWorkItemOpen || isMiscWorkItemOpen,
        })}
        onTransitionEnd={function () {
          this.setState({ revealText: true });
        }.bind(this)}
      >
        <button
          onClick={function () {
            this.setState(
              function (prevState) {
                return {
                  revealText: !prevState.revealText,
                };
              }.bind(this)
            );
          }.bind(this)}
        >
          {revealText ? "off" : "revealText"}
        </button>

        <div className="darkTextWrapper">
          {"Resume".split("").map(function (letter, index) {
            return (
              <p key={uniqueIDs[index]} style={{ transitionDelay: `${("Resume".length - index) * 100}ms` }}>
                {letter}
              </p>
            );
          })}
        </div>

        <Link className="linkWrapper" to="resume">
          {"Resume".split("").map(function (letter, index) {
            return (
              <p key={uniqueIDs[index] + "_linkWrapper"} style={{ transitionDelay: `${("Resume".length - index) * 50}ms` }}>
                {letter}
              </p>
            );
          })}
        </Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    navbar: state.navbar,
    styles: state.styles,
  };
}

export default withRouter(connect(mapStateToProps, {})(ResumePageButton));
