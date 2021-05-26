import React, { Component } from "react";
import classnames from "classnames";
import "./TextTracker.css";

class TextTrackerLetter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animateLetter: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    // if ((nextProps.lastLetter !== nextProps.letterItem.letter) && (!nextState.animateLetter || !nextState.animateLetter2)) {
    if (nextProps.lastLetter !== nextProps.letterItem.letter && nextState.animateLetter) {
      // if (nextProps.letterItem.letter === "a") console.log("should update false");
      return false;
    } else {
      // if (nextProps.letterItem.letter === "a") console.log("should update true");
      // console.log("else");
      // if (nextState.animateLetter) this.setState({ animateLetter: false });
      // if (nextState.animateLetter2) this.setState({ animateLetter2: false });
      return true;
    }
  }

  componentDidUpdate() {
    const { letterItem, lastLetter, lastLetterID, isCursorNotAtEndOfInput } = this.props;
    const { animateLetter, animateLetter2 } = this.state;
    // if (letterItem.letter === "a") console.log("update");

    if (lastLetter === letterItem.letter && lastLetterID !== this.state.lastLetterID && !animateLetter && !isCursorNotAtEndOfInput) {
      // console.log("animate on", animateLetter);
      // setTimeout(() => {
      this.setState({ animateLetter: true, lastLetterID });
      // }, 10);
    } else if (lastLetter === letterItem.letter && animateLetter && lastLetterID !== this.state.lastLetterID && !isCursorNotAtEndOfInput) {
      // console.log("animate on 2");
      // setTimeout(() => {
      this.setState({
        animateLetter2: true,
        // , animateLetter: false
        lastLetterID,
      });
      // }, 10);
    }

    // else if (lastLetter === letterItem.letter && animateLetter && animateLetter2 && lastLetterID !== this.state.lastLetterID) {
    //     console.log("animate on 3");
    //     this.setState({ animateLetter3: true, lastLetterID });
    // }

    // else (lastLetter === letterItem.letter && animateLetter && lastLetterID !== this.state.lastLetterID) {
    //     console.log("animate off");
    //     this.setState({
    //         animateLetter: false, animateLetter2: false
    //         // , animateLetter3: false
    //     })
    // }
  }

  render() {
    const { letterItem, index } = this.props;
    const { animateLetter, animateLetter2, animateLetter3 } = this.state;

    return (
      <div
        className={classnames("textTrackerLetterWrapper", {})}
        style={{
          // fontSize: "20px",
          transform: `translateZ(${letterItem.z1}px) translateX(-150px)`,
          marginLeft: `${letterItem.x1}%`,
          marginTop: `${letterItem.y1}%`,
        }}
      >
        <p
          className={classnames("", {
            blurLetter50: letterItem.z1 > 50,
            blurLetter90: letterItem.z1 > 90,
            animateTextTracker: animateLetter,
          })}
          style={{
            fontSize: "25px",
          }}
          onAnimationEnd={function (e) {
            // console.log("ani");
            this.setState({ animateLetter: false });
          }.bind(this)}
        >
          {letterItem.letter}
        </p>

        <p
          className={classnames("", {
            blurLetter50: letterItem.z1 > 50,
            blurLetter90: letterItem.z1 > 90,
            animateTextTracker: animateLetter2,
          })}
          style={{
            fontSize: "25px",
          }}
          onAnimationEnd={function (e) {
            // console.log("anim end");
            this.setState({ animateLetter2: false });
          }.bind(this)}
        >
          {letterItem.letter}
        </p>
      </div>
    );
  }
}

export default TextTrackerLetter;
