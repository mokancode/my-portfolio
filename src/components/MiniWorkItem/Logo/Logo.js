import React, { Component } from "react";
import classnames from "classnames";
import "./Logo.scss";
import LogoLetter from "./LogoLetter";
import { v4 as uuidv4 } from "uuid";
import isEmpty from "../../../is-empty";

export class Logo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photographyLogoHide: false,
      leftWord: "Mirror",
      centerWord: "Image",
      rightWord: "Carousel",
    };

    this.firstLetterInPositionFunc = this.firstLetterInPositionFunc.bind(this);
  }

  componentDidMount() {
    const { leftWord, centerWord, rightWord } = this.state;

    var leftWordIDs = [],
      centerWordIDs = [],
      rightWordIDs = [];
    for (var i = 0; i < leftWord.length; i++) {
      leftWordIDs.push(uuidv4());
    }
    for (var i = 0; i < centerWord.length; i++) {
      centerWordIDs.push(uuidv4());
    }
    for (var i = 0; i < rightWord.length; i++) {
      rightWordIDs.push(uuidv4());
    }

    this.setState({ leftWordIDs, centerWordIDs, rightWordIDs });
  }

  componentDidUpdate() {}

  firstLetterInPositionFunc() {
    if (!this.state.firstLetterInPosition) this.setState({ firstLetterInPosition: true });
  }

  render() {
    const { firstLetterInPosition, leftWord, centerWord, rightWord, leftWordIDs, centerWordIDs, rightWordIDs } = this.state;
    const { loadText } = this.props;

    if (isEmpty(leftWordIDs) || isEmpty(centerWordIDs) || isEmpty(rightWordIDs)) return null;

    return (
      <div className="logoDiv">
        <div
          className={classnames("logoLetterLists", {
            // "logoLetterListsShrinkText": centerLogoTextShow
          })}
        >
          <ul className={classnames("logoLetterList leftLogoText", {})}>
            {leftWord.split("").map(
              function (letter, index) {
                return (
                  <LogoLetter
                    key={leftWordIDs[index]}
                    loadText={loadText}
                    word={leftWord}
                    letter={letter}
                    letterIndex={index}
                    letterType="left"
                    firstLetterInPositionFunc={this.firstLetterInPositionFunc}
                    firstLetterInPosition={firstLetterInPosition}
                  />
                );
              }.bind(this)
            )}
          </ul>

          <ul className="logoLetterList centerLogoText">
            {centerWord.split("").map(function (letter, index) {
              return (
                <LogoLetter
                  key={centerWordIDs[index]}
                  word={centerWord}
                  loadText={loadText}
                  letter={letter}
                  letterIndex={index}
                  letterType="center"
                  firstLetterInPosition={firstLetterInPosition}
                />
              );
            })}
          </ul>

          <ul className="logoLetterList rightLogoText">
            {rightWord.split("").map(
              function (letter, index) {
                return (
                  <LogoLetter
                    key={rightWordIDs[index]}
                    loadText={loadText}
                    word={rightWord}
                    letter={letter}
                    letterIndex={index}
                    letterType="right"
                    firstLetterInPositionFunc={this.firstLetterInPositionFunc}
                    firstLetterInPosition={firstLetterInPosition}
                  />
                );
              }.bind(this)
            )}
          </ul>
        </div>
        {/* <div className={classnames("blueprintPrdzDiv", {
                        "blueprintPrdzDivShow": showBluePrintLogo
                    })}>
                        <p>Photos</p>
                    </div> */}
      </div>
    );
  }
}

export default Logo;
