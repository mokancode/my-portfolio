import React, { Component } from "react";
import "./MiddleText.css";
import MiddleTextLetter from "./MiddleTextLetter";
import classnames from "classnames";
import ShineGroup from "../../SVGs/Shine/ShineGroup";
import { v4 as uuidv4 } from "uuid";

export class MiddleText extends Component {
  constructor(props) {
    super(props);

    this.state = {
      word1: "Code",
      word2: "by",
    };

    this.restartAnim = this.restartAnim.bind(this);
  }

  componentDidMount() {
    setTimeout(
      function () {
        this.setState({ shadowAnim: true });
        // console.log("shadow anim start");
      }.bind(this),
      3000
    );

    const { word1, word2 } = this.props;
    var word1IDs1 = [],
      word1IDs2 = [],
      word1IDs3 = [],
      word2IDs = [];
    for (var i = 0; i < word1.length; i++) {
      word1IDs1.push(uuidv4());
    }
    for (var i = 0; i < word1.length; i++) {
      word1IDs2.push(uuidv4());
    }
    for (var i = 0; i < word1.length; i++) {
      word1IDs3.push(uuidv4());
    }
    for (var i = 0; i < word1.length; i++) {
      word2IDs.push(uuidv4());
    }
    this.setState({ word1IDs1, word1IDs2, word1IDs3, word2IDs });
  }

  async restartAnim() {
    this.setState(
      { shadowAnim: false },
      function () {
        setTimeout(
          function () {
            this.setState({ shadowAnim: true });
          }.bind(this),
          3000
        );
      }.bind(this)
    );
  }

  render() {
    const { visitedPages, uncoverLogo } = this.props;
    const { word1, word2, word1IDs1, word1IDs2, word1IDs3, word2IDs } = this.state;

    if (isEmpty(word1IDs1) || isEmpty(word1IDs2) || isEmpty(word1IDs3) || isEmpty(word2IDs)) return null;

    return (
      <div
        className={classnames("middleTextDiv", {
          middleTextDivFirstReveal: uncoverLogo && visitedPages.indexOf(String("landing").toLocaleLowerCase()) === -1,
          middleTextDivVisitedReveal: uncoverLogo && visitedPages.indexOf(String("landing").toLocaleLowerCase()) !== -1,
        })}
      >
        <div className="leftSideTextWrapper">
          <div className="leftSideText">
            {String(word1)
              .split("")
              .map(function (letter, index) {
                return (
                  <MiddleTextLetter
                    key={word1IDs1[index]}
                    letter={letter}
                    letterIndex={index}
                    direction={1}
                    visitedPages={visitedPages}
                    uncoverLogo={uncoverLogo}
                  />
                );
              })}
          </div>

          <div className="leftSideText leftSideTextBackgroundGlow">
            {String(word1)
              .split("")
              .map(function (letter, index) {
                return (
                  <MiddleTextLetter
                    key={word1IDs2[index]}
                    letter={letter}
                    letterIndex={index}
                    direction={1}
                    visitedPages={visitedPages}
                    uncoverLogo={uncoverLogo}
                    backgroundGlow={true}
                  />
                );
              })}
          </div>

          <div className="leftSideTextShadow">
            {String(word1)
              .split("")
              .map(
                function (letter, index) {
                  return (
                    <MiddleTextLetter
                      key={word1IDs3[index]}
                      letter={letter}
                      letterIndex={index}
                      direction={1}
                      visitedPages={visitedPages}
                      uncoverLogo={uncoverLogo}
                      shadow={true}
                      shadowAnim={this.state.shadowAnim}
                      restartAnim={this.restartAnim}
                    />
                  );
                }.bind(this)
              )}
          </div>
        </div>

        <div className="rightSideTextWrapper">
          <div className="rightSideText">
            {String(word2)
              .split("")
              .map(function (letter, index) {
                return (
                  <MiddleTextLetter
                    key={word2IDs[index]}
                    letter={letter}
                    letterIndex={index}
                    direction={-1}
                    visitedPages={visitedPages}
                    uncoverLogo={uncoverLogo}
                  />
                );
              })}
          </div>
        </div>

        <div
          className={classnames("shineGroupMiddleText", {
            shineGroupMiddleTextShow: uncoverLogo,
          })}
        >
          <ShineGroup amount={5} maxWidth={3} />
          <ShineGroup amount={7} maxWidth={5} />
        </div>
      </div>
    );
  }
}

export default MiddleText;
