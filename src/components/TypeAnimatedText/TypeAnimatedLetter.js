import React, { Component } from "react";
import classnames from "classnames";

class TypeAnimatedLetter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { letterIndex, wordIndex } = this.props;

    const animationDelay = 15 * letterIndex + wordIndex * 100;
    const transitionDelayClose = letterIndex + wordIndex * 50;
    const transitionDelayRegular = 15 * letterIndex + wordIndex * 50;
    this.setState({ animationDelay, transitionDelayClose, transitionDelayRegular });
  }

  render() {
    const { letter, animateText, closeWorkItem, letterIndex } = this.props;
    const { animationDelay, transitionDelayClose, transitionDelayRegular } = this.state;

    return (
      <span
        style={{
          animationDelay: `${animationDelay}ms`,
          transitionDelay: closeWorkItem ? `${transitionDelayClose}ms` : `${transitionDelayRegular}ms`,
          transitionDuration: closeWorkItem ? `.5s` : `1s`,
        }}
        className={classnames("typeWriterLetter", {
          typeWriterLetterAnimate: animateText,
          // , "typeWriterLetterNoAnim": firstLoad
          // , "hideTypeWriterLetter": closeWorkItem
        })}
      >
        {" "}
        {letter}
      </span>
    );
  }
}

export default TypeAnimatedLetter;
