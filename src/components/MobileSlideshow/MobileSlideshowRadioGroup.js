import React, { Component } from "react";
import "./MobileSlideshowRadioGroup.scss";
import MobileSlideshowRadioItem from "./MobileSlideshowRadioItem";
import { v4 as uuidv4 } from "uuid";
import isEmpty from "../../is-empty";

class MobileSlideshowRadioGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.setCurrentIndex = this.props.setCurrentIndex;
  }

  componentDidMount() {
    const { mobileImages } = this.props;
    if (!isEmpty(mobileImages)) {
      var uniqueIDs = [];
      for (var i = 0; i < mobileImages.length; i++) {
        uniqueIDs.push(uuidv4());
      }
    }
    this.setState({ uniqueIDs });
  }

  componentDidUpdate() {
    const { mobileImages } = this.props;
    if (!isEmpty(mobileImages) && isEmpty(this.state.uniqueIDs)) {
      const { mobileImages } = this.props;
      var uniqueIDs = [];
      for (var i = 0; i < mobileImages.length; i++) {
        uniqueIDs.push(uuidv4());
      }
      this.setState({ uniqueIDs });
    }
  }

  render() {
    const { mobileImages, currentIndex } = this.props;
    const { uniqueIDs } = this.state;

    return (
      <div className="mobileSlideshowRadioGroup">
        {!isEmpty(uniqueIDs) &&
          mobileImages.map(
            function (picItem, index) {
              return (
                <MobileSlideshowRadioItem
                  key={uniqueIDs[index]}
                  picItem={picItem}
                  index={index}
                  currentIndex={currentIndex}
                  setCurrentIndex={this.setCurrentIndex}
                />
              );
            }.bind(this)
          )}
      </div>
    );
  }
}

export default MobileSlideshowRadioGroup;
