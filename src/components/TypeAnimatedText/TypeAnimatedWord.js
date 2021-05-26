import React, { Component } from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import { setTypeAnimatedTextAnimState } from "../../actions/stylesActions";
import TypeAnimatedLetter from "./TypeAnimatedLetter";
import { v4 as uuidv4 } from "uuid";
import isEmpty from "../../is-empty";

class TypeAnimatedWord extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.hideDiv = this.props.hideDiv;
    this.setHideTextDiv = this.props.setHideTextDiv;
    this.closeWorkItemFunc = this.props.closeWorkItemFunc;
    this.textFinishedLoading = this.props.textFinishedLoading;
  }

  generateRandomInterval(max, min, wordIndex) {
    // console.log("index", wordIndex);
    var randomNum = Math.floor(Math.random() * (max - min + 1) + min);
    if (wordIndex) {
      if (!this.state.randomNum || randomNum > this.state.randomNum) this.setState({ randomNum, wordIndex });
    }

    return randomNum;
  }

  componentDidMount() {
    const { word, wordIndex } = this.props;
    this.setState({ transitionDelay: this.generateRandomInterval(4, 1, wordIndex) });

    var uniqueIDs = [];
    for (var i = 0; i < word.length; i++) {
      uniqueIDs.push(uuidv4());
    }
    this.setState({ uniqueIDs });
  }

  render() {
    const { word, wordIndex, animateText, closeWorkItem } = this.props;
    const { transitionDelay, hideDiv, uniqueIDs } = this.state;

    return (
      <div
        className={classnames("typeWriterWord", {
          hideTypeWriterWord: closeWorkItem,
        })}
        style={{ transitionDelay: `.${transitionDelay}s` }}
        onTransitionEnd={function () {
          // closing sequence
          if (this.state.wordIndex === wordIndex && closeWorkItem && !hideDiv) {
            this.setState({ hideDiv: true });
            this.hideDiv(); // 2 parent compoenents above. Hides DescriptionOfWork.js
            this.setHideTextDiv(); // 1 parent component above. Hides TypeAnimatedText.js
            this.closeWorkItemFunc(false, true);
            this.props.setTypeAnimatedTextAnimState(null);
          }

          // opening sequence
          else if (this.state.wordIndex === wordIndex && animateText && !this.state.textFinishedLoading) {
            this.setState({ textFinishedLoading: true });
            this.props.setTypeAnimatedTextAnimState(true);
          }
        }.bind(this)}
      >
        {!isEmpty(uniqueIDs) &&
          word.split("").map(
            function (letter, letterIndex) {
              return (
                <TypeAnimatedLetter
                  key={uniqueIDs[letterIndex]}
                  letter={letter}
                  letterIndex={letterIndex}
                  wordIndex={wordIndex}
                  animateText={animateText}
                  closeWorkItem={closeWorkItem}
                />
              );
              // <span key={letterIndex} style={{
              //     animationDelay: `${15 * letterIndex + (wordIndex * 100)}ms`
              //     , transitionDelay: closeWorkItem ? `${letterIndex + (wordIndex * 50)}ms` : `${15 * letterIndex + (wordIndex * 100)}ms`
              //     // , transitionDelay: closeWorkItem ? `${200}ms` : `${400}ms`
              //     , transitionDuration: closeWorkItem ? `.5s` : `1s`
              // }} className={classnames("typeWriterLetter", {
              //     "typeWriterLetterAnimate": animateText
              //     // , "typeWriterLetterNoAnim": firstLoad
              //     // , "hideTypeWriterLetter": closeWorkItem

              // })}>{letter}</span>
            }.bind(this)
          )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    styles: state.styles,
  };
}

export default connect(mapStateToProps, { setTypeAnimatedTextAnimState })(TypeAnimatedWord);
// export default TypeAnimatedWord;
