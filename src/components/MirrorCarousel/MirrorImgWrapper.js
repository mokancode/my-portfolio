import React, { Component } from "react";
import classnames from "classnames";
import "./MirrorImg.css";

class MirrorImgWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.resetTransitionPause = this.props.resetTransitionPause;
    this.setSlideshowClosed = this.props.setSlideshowClosed;
    this.setShowLight = this.props.setShowLight;

    // refs
    this.wrapperRef = React.createRef();
  }

  componentDidUpdate() {}

  render() {
    const { closeCarousel, slideshowClosed, loadBtnsClass, currentIndex, startingIndex, src, mirrorCarouselControllerLoaded } = this.props;
    const { imgLoaded } = this.state;

    return (
      <div
        className="mirrorImgWrapper"
        onTransitionEnd={function (e) {
          e.stopPropagation();
          if (closeCarousel && startingIndex === 2 && !slideshowClosed) {
            this.setSlideshowClosed();
            // console.log("mirrorImgWrapper transition end", e.target);
          }
        }.bind(this)}
      >
        <div className="mirrorTopImgWrapper">
          <img
            className={classnames("mirrorImg mirrorTopImg", {
              mirrorImgLoaded: imgLoaded && mirrorCarouselControllerLoaded,
            })}
            src={src}
            alt={`mirrorTopImg${currentIndex}`}
            onLoad={function () {
              this.setState({ imgLoaded: true });
            }.bind(this)}
            onTransitionEnd={function (e) {
              e.stopPropagation();
              if (!loadBtnsClass && startingIndex === 2 && this.props.showButtons) {
                // console.log("show btns")
                this.props.showButtons();
              }

              if (imgLoaded && mirrorCarouselControllerLoaded) {
                this.setShowLight(true);
              }
            }.bind(this)}
          ></img>
        </div>
        <div className="mirrorBottomImgWrapper">
          <img
            className={classnames("mirrorImg mirrorBottomImg", {
              mirrorImgLoaded: imgLoaded && mirrorCarouselControllerLoaded,
            })}
            src={src}
            alt={`mirrorBottomImg${currentIndex}`}
          ></img>
        </div>
      </div>
    );
  }
}

export default MirrorImgWrapper;
