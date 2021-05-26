import React, { Component } from "react";
import classnames from "classnames";
import "./TypeAnimatedText.scss";
import { connect } from "react-redux";
import { setTypeAnimatedTextAnimState } from "../../actions/stylesActions";
import TypeAnimatedWord from "./TypeAnimatedWord";
import { v4 as uuidv4 } from "uuid";

import TypeAnimatedTextWhole from "./TypeAnimatedTextWhole";
import isEmpty from "../../is-empty";

class TypeAnimatedText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animateText: false,
    };

    this.hideDiv = this.props.hideDiv;
    this.setHideTextDiv = this.setHideTextDiv.bind(this);
    this.closeWorkItemFunc = this.props.closeWorkItemFunc;
    this.textFinishedLoading = this.props.textFinishedLoading;
  }

  componentDidMount() {
    const { text } = this.props;
    var uniqueIDs = [];
    for (var i = 0; i < text.length; i++) {
      uniqueIDs.push(uuidv4());
    }
    this.setState({ uniqueIDs });

    // setTimeout(() => {
    //     console.log("browserName text:", this.props.browserName);
    // }, 5000);

    // const { text } = this.props;
    // console.log("text", text.split(/\s/));

    // const { animateText } = this.props;
    // if (animateText && !this.state.animateText) {
    //     setTimeout(() => {
    //         this.setState({ animateText: true });
    //     }, 50);
    // }
  }

  // componentDidUpdate() {
  //     const { animateText } = this.props;
  //     if (animateText && !this.state.animateText) {
  //         setTimeout(() => {
  //             this.setState({ animateText: true });
  //         }, 1500);
  //         console.log("update")
  //     }
  // }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //     if (nextProps.animateText !== prevState.animateText && !prevState.animateText) {
  //         return {
  //             animateText: nextProps.animateText
  //         }
  //     }
  //     return null;
  // }

  setHideTextDiv() {
    this.setState({ hideTypeAnimatedTextDiv: true });
  }

  render() {
    const { text, firstLoad, closeWorkItem, animateText, isMobileMode, browserName } = this.props;
    const { hideTypeAnimatedTextDiv, uniqueIDs } = this.state;

    return (
      <div
        className={classnames("typeAnimatedTextDiv", {
          hideTypeAnimatedTextDiv: hideTypeAnimatedTextDiv,
        })}
      >
        {isMobileMode ||
        // && false
        browserName !== "chrome" ? (
          <TypeAnimatedTextWhole
            animateText={animateText}
            closeWorkItem={closeWorkItem}
            hideDiv={this.hideDiv}
            setHideTextDiv={this.setHideTextDiv}
            closeWorkItemFunc={this.closeWorkItemFunc}
            textFinishedLoading={this.textFinishedLoading}
            text={text}
          />
        ) : (
          !isEmpty(uniqueIDs) &&
          text.split(/\s/).map(
            function (word, wordIndex) {
              return (
                <TypeAnimatedWord
                  key={uniqueIDs[wordIndex]}
                  wordIndex={wordIndex}
                  animateText={animateText}
                  closeWorkItem={closeWorkItem}
                  hideDiv={this.hideDiv}
                  setHideTextDiv={this.setHideTextDiv}
                  closeWorkItemFunc={this.closeWorkItemFunc}
                  textFinishedLoading={this.textFinishedLoading}
                  word={word}
                />
              );
            }.bind(this)
          )
        )}

        {/* <p>{text}</p> */}
        {/* {text.split("").map(function (letter, index) {
                    return
                }.bind(this))} */}
      </div>
    );
  }
}

// function mapStateToProps(state) {
//     return {
//         styles: state.styles
//     }
// }

// export default connect(mapStateToProps, { setTypeAnimatedTextAnimState })(TypeAnimatedText);
export default TypeAnimatedText;
