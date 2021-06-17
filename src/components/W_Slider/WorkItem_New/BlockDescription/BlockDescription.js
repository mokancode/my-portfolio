import React, { Component } from "react";
import classnames from "classnames";
import "./BlockDescription.scss";
import "./BlockDescriptionMobile.css";
import "./GZ_BlockDescription.scss";
import "./Quiza_BlockDescription.scss";
import "./ProjectOrganizer_BlockDescription.scss";
import "./Ardi_BlockDescription.scss";
import isEmpty from "../../../../validation/is-empty";
import { v4 as uuidv4 } from "uuid";
import BlockDescriptionItem from "./BlockDescriptionItem";

class BlockDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeouts: [],
    };

    this.showShadowHandler = this.showShadowHandler.bind(this);
  }

  componentDidMount() {
    const { blocksDescriptionArray } = this.props;

    var uniqueIDs = [];
    for (var i = 0; i < blocksDescriptionArray.length; i++) {
      uniqueIDs.push(uuidv4());
    }
    this.setState({ uniqueIDs });

    const { assembleFront } = this.props;
    if (assembleFront && !this.state.assembleFront) {
      // this.setState({ assembleFrontHandled: true });
      // var timeoutId = setTimeout(function () {
      this.setState({ assembleFront: true });
      // }.bind(this), 1000);
      // timeouts.push(timeoutId);
      // this.setState({
      //     timeouts
      // });
    }
  }

  componentDidUpdate() {
    const { assembleFront } = this.props;
    var { timeouts } = this.state;

    if (assembleFront && !this.state.assembleFront && !this.state.assembleFrontHandled) {
      this.setState({ assembleFrontHandled: true });
      var timeoutId = setTimeout(
        function () {
          this.setState({ assembleFront: true });
        }.bind(this),
        1000
      );
      timeouts.push(timeoutId);
      this.setState({
        timeouts,
      });
    }
  }

  componentWillUnmount() {
    var { timeouts } = this.state;
    while (!isEmpty(timeouts)) window.clearTimeout(timeouts.pop());
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.closeWorkItem !== prevState.closeWorkItem && !nextProps.isMobileMode && nextProps.browserName === "chrome") {
      return {
        closeWorkItem: nextProps.closeWorkItem,
      };
    }

    return null;
  }

  showShadowHandler() {
    this.setState({ showShadow: true });
  }

  render() {
    const { blocksDescriptionArray, workItemClass, firstLoad, isMobileMode, browserName } = this.props;
    const { assembleFront, showShadow, closeWorkItem, uniqueIDs } = this.state;

    return (
      <div
        className={classnames("blockDescriptionsWrapper", {
          blockDescriptionsWrapperShadow:
            (assembleFront && !isMobileMode && browserName === "chrome") ||
            (assembleFront && (isMobileMode || browserName !== "chrome") && showShadow),
          hideBlockDescriptionsWrapper: closeWorkItem,
        })}
        style={{
          // animationDuration: `${firstLoad ? "0" : "unset"}s`
          transitionDuration: closeWorkItem ? "1s, .5s" : "2s, 3s",
        }}
      >
        {!isEmpty(uniqueIDs) &&
          blocksDescriptionArray.map(
            function (blockItem, index) {
              return (
                <BlockDescriptionItem
                  key={uniqueIDs[index]}
                  blockItem={blockItem}
                  index={index}
                  assembleFront={assembleFront}
                  closeWorkItem={closeWorkItem}
                  workItemClass={workItemClass}
                  showShadowHandler={this.showShadowHandler}
                />
              );
            }.bind(this)
          )}
      </div>
    );
  }
}

export default BlockDescription;
