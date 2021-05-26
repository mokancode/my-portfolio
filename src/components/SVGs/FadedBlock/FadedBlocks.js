import React, { Component } from "react";
import FadedBlock from "./FadedBlock";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import classNames from "classnames";

class FadedBlocks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfFadedBlocks: 8,
    };
  }

  componentDidMount() {
    var uniqueIDs = [];
    for (var i = 0; i < this.state.numberOfFadedBlocks; i++) {
      uniqueIDs.push(uuidv4());
    }
    this.setState({ uniqueIDs });
  }

  render() {
    const { fadedBlockReady } = this.props;
    const { uniqueIDs, numberOfFadedBlocks } = this.state;
    const { starsShowing } = this.props.styles;

    return (
      <div
        className={classNames("fadedBlocksDiv", {
          show: starsShowing,
        })}
      >
        {uniqueIDs &&
          new Array(numberOfFadedBlocks).fill(undefined).map(
            function (fadedBlock, index) {
              return <FadedBlock key={uniqueIDs[index]} index={index} readyToLoad={fadedBlockReady} />;
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

export default connect(mapStateToProps, {})(FadedBlocks);
