import React, { Component } from "react";
import "./MyNameText.scss";
import classnames from "classnames";
import MyNameTextLetter from "./MyNameTextLetter";
import { v4 as uuidv4 } from "uuid";
import isEmpty from "../../is-empty";

export class MyNameText extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // name: "Mike Kandino"
      name: "Mike",
    };

    this.showElectricityFunc = this.props.showElectricityFunc;
  }

  componentDidMount() {
    var uniqueIDs = [];
    for (var i = 0; i < this.state.name.length; i++) {
      uniqueIDs.push(uuidv4());
    }
    this.setState({ uniqueIDs });
  }

  componentDidUpdate() {
    const { revealText, uncoverLogo } = this.props;
    const { revealTopPreText, electrified } = this.state;

    if (uncoverLogo && !electrified) {
      // console.log("elec electrify");
      this.setState(
        { electrified: true },
        function () {
          setTimeout(
            function () {
              this.setState(
                { electrifyK: true },
                function () {
                  setTimeout(
                    function () {
                      this.setState({ electrifyK: false });
                    }.bind(this),
                    300
                  );
                }.bind(this)
              );
            }.bind(this),
            6000
          );
        }.bind(this)
      );
    }

    if (revealText === true && revealTopPreText === false) {
      this.setState({ revealTopPreText: true });
    }

    if (uncoverLogo && !this.state.uncoverLogo) this.setState({ uncoverLogo: true });
  }

  render() {
    const { visitedPages } = this.props;
    const { uncoverLogo, name, revealTopPreText, electrifyK, uniqueIDs } = this.state;

    return (
      <div
        className={classnames("myNameTextDiv", {
          revealTopPreText: revealTopPreText,
        })}
      >
        <div className="myNameLetters">
          {!isEmpty(uniqueIDs) &&
            name.split("").map(
              function (letter, index) {
                return (
                  <MyNameTextLetter
                    key={uniqueIDs[index]}
                    letter={letter}
                    letterIndex={index}
                    uncoverLetter={
                      true
                      // uncoverLogo
                    }
                    visitedPages={visitedPages}
                    electrifyK={electrifyK}
                    showElectricityFunc={this.showElectricityFunc}
                  />
                );
              }.bind(this)
            )}
        </div>

        <div className="nameBackgroundGlow">
          {!isEmpty(uniqueIDs) &&
            name.split("").map(
              function (letter, index) {
                return (
                  <MyNameTextLetter
                    key={uniqueIDs[index] + "_glow"}
                    letter={letter}
                    letterIndex={index}
                    uncoverLetter={
                      true
                      // uncoverLogo
                    }
                    visitedPages={visitedPages}
                  />
                );
              }.bind(this)
            )}
        </div>
      </div>
    );
  }
}

export default MyNameText;
