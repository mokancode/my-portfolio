import React, { Component } from "react";
import "./ProgressiveAppearText.css";
import classnames from "classnames";
import { v4 as uuidv4 } from "uuid";
import isEmpty from "../../is-empty";

class ProgressiveAppearText extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // setTimeout(function () {
    //     this.setState({ showLetters: true });
    // }.bind(this), 10);

    const { text } = this.props;
    var uniqueIDs = [];
    for (var i = 0; i < text.length; i++) {
      uniqueIDs.push(uuidv4());
    }
    this.setState({ uniqueIDs });
  }

  componentDidUpdate() {
    if (this.props.show && !this.state.showLetters) this.setState({ showLetters: true });
  }

  shouldComponentUpdate() {
    if (this.state.showLetters == true) return false;
    return true;
  }

  render() {
    const { text, itemIndex } = this.props;
    const { showLetters, uniqueIDs } = this.state;

    return (
      <div
        className={classnames("progressiveAppearText", {
          show: showLetters,
        })}
      >
        {!isEmpty(uniqueIDs) &&
          String(text)
            .split("")
            .map(function (letter, index) {
              return letter === " " ? (
                <span key={uniqueIDs[index]} className="spaceSpan"></span>
              ) : (
                <p key={uniqueIDs[index]} style={{ animationDelay: `${index * 50 + itemIndex * 300}ms` }}>
                  {letter}
                </p>
              );
            })}
      </div>
    );
  }
}

export default ProgressiveAppearText;
