import React, { Component } from "react";
import "./MirrorCarousel.scss";
import MirrorImgWrapper from "./MirrorImgWrapper";
import classnames from "classnames";
import isEmpty from "../../validation/is-empty";
import { v4 as uuidv4 } from "uuid";

class MirrorCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: {
        name: "Nature",
        array: [
          {
            src: "./mirror_carousel_images/wheat.jpg",
            alt: "wheat",
            dominantColor: "orange",
          },
          {
            src: "./mirror_carousel_images/mountain.jpg",
            alt: "mountain",
            dominantColor: "lightblue",
          },
          {
            src: "./mirror_carousel_images/beach.jpg",
            alt: "beach",
            dominantColor: "lightblue",
          },
          {
            src: "./mirror_carousel_images/path.jpg",
            alt: "path",
            dominantColor: "white",
          },
          {
            src: "./mirror_carousel_images/hay.jpeg",
            alt: "hay",
            dominantColor: "blue",
          },
          {
            src: "./mirror_carousel_images/turtle.jpg",
            alt: "turtle",
            dominantColor: "cyan",
          },
          // repeat
          {
            src: "./mirror_carousel_images/wheat.jpg",
            alt: "wheat",
            dominantColor: "orange",
          },
        ],
      },
    };

    this.moveSlideshow = this.moveSlideshow.bind(this);
    this.resetTransitionPause = this.resetTransitionPause.bind(this);
    this.setShowLight = this.setShowLight.bind(this);

    this.enableButtons = this.props.enableButtons;
    this.showButtons = this.props.showButtons;

    this.resetMoveRight = this.props.resetMoveRight;
    this.resetMoveLeft = this.props.resetMoveLeft;
    this.resetMoveLeft = this.props.resetMoveLeft;

    this.setSlideshowClosed = this.props.setSlideshowClosed;

    // refs
    this.mirrorCarousel = React.createRef();
  }

  componentDidMount() {
    const { images } = this.state;
    var uniqueIDs = [];
    for (var i = 0; i < images.array.length; i++) {
      uniqueIDs.push(uuidv4());
    }
    this.setState({ uniqueIDs });
  }

  componentDidUpdate() {
    const { moveLeft, moveRight, mirrorCarouselControllerLoaded, startingIndex } = this.props;
    var { currentIndex, initialImgSet } = this.state;

    if (mirrorCarouselControllerLoaded && !initialImgSet) {
      var amountToMove = `${-100 * startingIndex}%`;
      // console.log("amount to move", amountToMove);
      this.setState({ amountToMove, currentIndex: startingIndex });
      this.setState(
        { initialImgSet: true, setInitialImg: true, pauseTransition: true },
        function () {
          this.mirrorCarousel.current.style.transform = `translateX(${amountToMove})`;
        }.bind(this)
      );
    }

    if (moveLeft && !this.state.moveLeft) {
      this.setState(
        { moveLeft: true },
        function () {
          this.setState(
            { moveLeft: false },
            function () {
              currentIndex = currentIndex - 1;
              this.moveSlideshow(currentIndex);
              this.resetMoveLeft();
            }.bind(this)
          );
        }.bind(this)
      );
    } else if (moveRight && !this.state.moveRight) {
      this.setState(
        { moveRight: true },
        function () {
          this.setState(
            { moveRight: false },
            function () {
              currentIndex = currentIndex + 1;
              this.moveSlideshow(currentIndex);
              this.resetMoveRight();
            }.bind(this)
          );
        }.bind(this)
      );
    }
  }

  moveSlideshow(currentIndex) {
    const { images } = this.state;

    // console.log("currentindex", currentIndex, images.array.length);
    // this.setState({ disableControls: true });

    if (currentIndex < 0) {
      this.setState(
        { pauseTransition: true },
        function () {
          // console.log("currentindex one", currentIndex);
          currentIndex = images.array.length - 1;
          var amountToMove = `${-100 * currentIndex}%`;
          this.mirrorCarousel.current.style.transform = `translateX(${amountToMove})`;
          var amountToMoveAfterPause = `${-100 * (currentIndex - 1)}%`;
          currentIndex--;
          this.setState({ amountToMoveAfterPause, currentIndex });
        }.bind(this)
      );
    }
    if (currentIndex > images.array.length - 1) {
      this.setState(
        { pauseTransition: true },
        function () {
          // console.log("currentindex two", currentIndex);
          currentIndex = 0;
          var amountToMove = `${-100 * currentIndex}%`;
          this.mirrorCarousel.current.style.transform = `translateX(${amountToMove})`;
          var amountToMoveAfterPause = `${-100 * (currentIndex + 1)}%`;
          currentIndex++;
          this.setState({ amountToMoveAfterPause, currentIndex });
        }.bind(this)
      );
    } else {
      // console.log("currentindex three", currentIndex);
      var amountToMove = `${-100 * currentIndex}%`;
      // console.log("amount to move", amountToMove);
      this.mirrorCarousel.current.style.transform = `translateX(${amountToMove})`;
      this.setState({ currentIndex });
    }
  }

  resetTransitionPause() {
    if (this.state.pauseTransition) this.setState({ pauseTransition: false, amountToMoveAfterPause: null, amountToMove: null });
  }

  setShowLight() {
    const { mirrorCarouselDivWrapperShowLight } = this.state;
    if (!mirrorCarouselDivWrapperShowLight) {
      // console.log("mirrorCarouselShowLight");
      this.setState({ mirrorCarouselDivWrapperShowLight: true });
    }
    // this.setState({ mirrorCarouselDivWrapperShowLight: true });
  }

  render() {
    const { slideshowClosed, loadBtnsClass, startingIndex, mirrorCarouselControllerLoaded, disableControls, closeCarousel } = this.props;
    const { images, uniqueIDs } = this.state;
    var { currentIndex, amountToMove, amountToMoveAfterPause, pauseTransition, mirrorCarouselDivWrapperShowLight } = this.state;

    return (
      <div
        className={classnames("mirrorCarouselDivWrapper", {
          closeCarousel: closeCarousel,
          mirrorCarouselDivWrapperShowLight: mirrorCarouselDivWrapperShowLight,
          mirrorCarouselDivWrapper_Cyan:
            !isEmpty(images) &&
            !isEmpty(currentIndex) &&
            !isEmpty(images.array[currentIndex]) &&
            images.array[currentIndex].dominantColor === "cyan",
          mirrorCarouselDivWrapper_Blue:
            !isEmpty(images) &&
            !isEmpty(currentIndex) &&
            !isEmpty(images.array[currentIndex]) &&
            images.array[currentIndex].dominantColor === "blue",
          mirrorCarouselDivWrapper_LightBlue:
            !isEmpty(images) &&
            !isEmpty(currentIndex) &&
            !isEmpty(images.array[currentIndex]) &&
            images.array[currentIndex].dominantColor === "lightblue",
          mirrorCarouselDivWrapper_Orange:
            !isEmpty(images) &&
            !isEmpty(currentIndex) &&
            !isEmpty(images.array[currentIndex]) &&
            images.array[currentIndex].dominantColor === "orange",
          mirrorCarouselDivWrapper_White:
            !isEmpty(images) &&
            !isEmpty(currentIndex) &&
            !isEmpty(images.array[currentIndex]) &&
            images.array[currentIndex].dominantColor === "white",
        })}
        onTransitionEnd={function (e) {
          e.stopPropagation();
        }.bind(this)}
      >
        <div className="mirrorCarouselDiv">
          <ul
            ref={this.mirrorCarousel}
            className={classnames("mirrorImgList", {
              mirrorImgListPaused: pauseTransition,
            })}
            onTransitionEnd={function (e) {
              e.stopPropagation();
              if (pauseTransition && !isEmpty(amountToMoveAfterPause)) {
                // console.log("mirrorCarousel 1");
                setTimeout(
                  function () {
                    this.mirrorCarousel.current.style.transform = `translateX(${amountToMoveAfterPause})`;
                  }.bind(this),
                  10
                );
                this.setState({ pauseTransition: false, amountToMoveAfterPause: null });
              } else if (pauseTransition && this.state.setInitialImg) {
                // console.log("mirrorCarousel 2");
                this.setState({ pauseTransition: false, setInitialImg: false });
              } else if (!pauseTransition) {
                // console.log("mirrorCarousel 3");
                if (disableControls) this.enableButtons();
              }
            }.bind(this)}
          >
            {!isEmpty(uniqueIDs) &&
              images.array.map(
                function (imgItem, index) {
                  return (
                    <MirrorImgWrapper
                      key={uniqueIDs[index]}
                      src={imgItem.src}
                      currentIndex={currentIndex}
                      amountToMove={amountToMove}
                      amountToMoveAfterPause={amountToMoveAfterPause}
                      pauseTransition={pauseTransition}
                      resetTransitionPause={this.resetTransitionPause}
                      index={index}
                      disableControls={this.props.disableControls}
                      mirrorCarouselControllerLoaded={mirrorCarouselControllerLoaded}
                      showButtons={this.showButtons}
                      startingIndex={startingIndex}
                      loadBtnsClass={loadBtnsClass}
                      closeCarousel={closeCarousel}
                      setSlideshowClosed={this.setSlideshowClosed}
                      slideshowClosed={slideshowClosed}
                      setShowLight={this.setShowLight}
                    />
                  );
                }.bind(this)
              )}
          </ul>
        </div>
      </div>
    );
  }
}

export default MirrorCarousel;
