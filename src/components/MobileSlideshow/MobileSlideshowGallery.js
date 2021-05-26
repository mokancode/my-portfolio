import React, { Component } from "react";
import isEmpty from "../../is-empty";
import "./MobileSlideshowGallery.css";
import MobileSlideshowImage from "./MobileSlideshowImage";
import { v4 as uuidv4 } from "uuid";

class MobileSlideshowGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
      <div className="mobileSlideshowGallery">
        {!isEmpty(uniqueIDs) &&
          mobileImages.map(
            function (picItem, index) {
              return <MobileSlideshowImage key={uniqueIDs[index]} picItem={picItem} currentIndex={currentIndex} index={index} />;
            }.bind(this)
          )}
      </div>
    );
  }
}

export default MobileSlideshowGallery;
