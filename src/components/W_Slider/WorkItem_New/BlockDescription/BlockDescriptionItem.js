import React, { Component } from "react";
import FingerPointer from "../../../SVGs/FingerPointer/FingerPointer";
import HappyUserIcon from "../../../SVGs/HappyUserIcon/HappyUserIcon";
import CameraIcon from "./Icons/CameraIcon/CameraIcon";
import classnames from "classnames";
import generateRandomInterval from "../../../../utilities/generateRandomInteger";
import isEmpty from "../../../../is-empty";
import { v4 as uuidv4 } from "uuid";

class BlockDescriptionItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.showShadowHandler = this.props.showShadowHandler;
  }

  componentDidMount() {
    const { blockItem } = this.props;

    var uniqueIDs = [];
    for (var i = 0; i < blockItem.firstWord.length; i++) {
      uniqueIDs.push(uuidv4());
    }
    this.setState({ uniqueIDs });
  }

  render() {
    const { blockItem, index, assembleFront, closeWorkItem, workItemClass, showShadow } = this.props;
    const { uniqueIDs } = this.state;

    return (
      <div
        className={classnames("blockDescriptionItem", {
          blockDescriptionItemShadow: assembleFront && !closeWorkItem,
          hideBlockDescriptionItem: closeWorkItem,
        })}
        // style={{ transitionDuration: `${!firstLoad ? 1 : 0}s`, transitionDelay: `${!firstLoad ? ".5" : 0}s` }}
        style={{
          // animationDuration: `${!firstLoad ? 2 : 0}s`
          transitionDuration: closeWorkItem ? "1s, 1s" : "2s, 3s",
        }}
      >
        <p className="blockFirstWord">
          {!isEmpty(uniqueIDs) &&
            blockItem.firstWord.split("").map(
              function (letter, index) {
                return (
                  <span
                    key={uniqueIDs[index]}
                    className={classnames("blockFirstWordLetter", {
                      blockFirstWordLetterAnimate: assembleFront,
                      hideBlockFirstWordLetter: closeWorkItem,
                    })}
                    style={{
                      // "animationDelay": `${!firstLoad ? blockItem.firstWord.split("").length / ((index + 1) * 20) : 0}s`
                      // , animationDuration: `${!firstLoad ? 3 : 0}s`
                      transitionDelay: closeWorkItem
                        ? `${index * 10 * generateRandomInterval(5, 1)}ms`
                        : `${blockItem.firstWord.split("").length / ((index + 1) * 40)}s`,
                    }}
                    onTransitionEnd={function (e) {
                      if (index === blockItem.firstWord.length - 1 && !showShadow) {
                        this.showShadowHandler();
                      }
                    }.bind(this)}
                  >
                    {letter}
                  </span>
                );
              }.bind(this)
            )}
        </p>
        <p
          className={classnames("blockSentence", {
            blockSentenceShow: assembleFront,
            hideBlockSentence: closeWorkItem,
          })}
        >
          {blockItem.sentence}
        </p>
        <div className="blockDescriptionIconWrapper">
          <div
            className={classnames("icon blockDescriptionIcon", {
              blockDescriptionIconShow: assembleFront,
              hideBlockDescriptionIcon: closeWorkItem,
            })}
          >
            {index === 0 && workItemClass === "greenZenphonyWorkItemDiv" ? <FingerPointer /> : null}
            {index === 1 && workItemClass === "greenZenphonyWorkItemDiv" ? <CameraIcon /> : null}

            {index === 0 && workItemClass === "quizaWorkItemDiv" ? <HappyUserIcon /> : null}
            {index === 1 && workItemClass === "quizaWorkItemDiv" ? <p>{`</>`}</p> : null}
          </div>
        </div>
      </div>
    );
  }
}

export default BlockDescriptionItem;
