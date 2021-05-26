import React, { Component } from "react";
import classnames from "classnames";
import isEmpty from "../../is-empty";

import { setWImageSliderClosed } from "../../actions/stylesActions";
import { connect } from "react-redux";
import { useSwipeable, Swipeable } from "react-swipeable";

class W_ImageSliderItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imgDataCollectionMode: true,
    };

    this.showSideImagesFunc = this.props.showSideImagesFunc;
    this.updateImages = this.props.updateImages;
    this.setImgReady = this.props.setImgReady;
    this.firstPicLoadedFunc = this.props.firstPicLoadedFunc;
    this.hideSliderFunc = this.props.hideSliderFunc;
    this.setCurrentIndex = this.props.setCurrentIndex;
    this.unlockControls = this.props.unlockControls;
    this.removeShadow = this.props.removeShadow;

    // refs
    this.imgRef = React.createRef();
  }

  componentDidUpdate() {
    const { currentIndex } = this.props;
    const { imgExpanded } = this.state;
    if (currentIndex !== this.state.currentIndex || (!isEmpty(currentIndex) && isEmpty(this.state.currentIndex))) {
      // console.log("current props", currentIndex);
      this.setState({ currentIndex });
      if (imgExpanded) this.setState({ imgExpanded: false });
    }

    if (this.props.showImages && !this.state.showImages) {
      // setTimeout(() => {
      this.setState({ showImages: true });
      // }, 1000);
    }
  }

  componentDidMount() {
    const { imageItem, currentIndex } = this.props;
    if (!isEmpty(currentIndex) && isEmpty(this.state.currentIndex)) this.setState({ currentIndex });

    const img = new Image();
    img.src = imageItem.src;
    this.setState({ img });
  }

  render() {
    var { images, index, imageItem, showSideImages, firstPicLoaded, showImages, hideSideImages, isMiscWorkItem, lockControls } = this.props;
    const { currentIndex, img, imgExpanded, setExpandedPic, imgCentered, imgReady, imgDataCollectionMode } = this.state;

    return (
      <div
        className={classnames("W_SliderImageWrapper", {
          W_SliderImageWrapper_CurrentPic: index === currentIndex,
        })}
      >
        {/* <div className="W_SliderImageInnerWrapper"> */}
        <Swipeable
          className="W_SliderImageInnerWrapper"
          onSwiped={function (eventData) {
            // console.log("swipe", eventData);
            if (eventData.dir === "Left") this.setCurrentIndex(++index);
            else if (eventData.dir === "Right") this.setCurrentIndex(--index);
          }.bind(this)}
          // {...config}
        >
          <img
            className={classnames("W_SliderImage", {
              W_SliderImage_imgDataCollectionMode: imgDataCollectionMode,
              W_SliderImage_GetExpandedSize: setExpandedPic,
              W_SliderImageReady: imgReady,

              // , "W_SliderImage_Show": imgReady && (index === currentIndex && showImages || index === currentIndex - 1 && showImages || index === currentIndex + 1 && showImages && showSideImages)
              W_SliderImage_Show:
                imgReady &&
                showImages &&
                (index === currentIndex || (firstPicLoaded && (index === currentIndex - 1 || index === currentIndex + 1))),
              W_SliderImage_CurrentPicHide: index === currentIndex && !showImages && imgReady && hideSideImages,

              W_SliderImage_CurrentPic: index === currentIndex,
              W_SliderImage_CurrentLeft: index === currentIndex - 1,
              W_SliderImage_CurrentRight: index === currentIndex + 1,
              W_SliderImage_CurrentLeftLoaded: imgReady && index === currentIndex - 1 && showImages && showSideImages,
              W_SliderImage_CurrentRightLoaded: imgReady && index === currentIndex + 1 && showImages && showSideImages,
              W_SliderImageExpanded: imgExpanded,
              W_SliderImage_SideImage_Hide: (index === currentIndex - 1 || index === currentIndex + 1) && hideSideImages,
            })}
            ref={this.imgRef}
            src={img && img.src ? img.src : null}
            alt={`imgSliderItemPic${index}`}
            onLoad={function (e) {
              // console.log(`loaded ${index}`);
              images[index].widthValue = e.target.clientWidth;
              images[index].heightValue = e.target.clientHeight;

              // console.log("onLoad width", e.target.clientWidth);

              images[index].domPath = e.target;
              this.updateImages(images);

              this.setState({ setExpandedPic: true });

              // if (this.props.styles.W_ImageSliderClosed) {
              //     this.props.setWImageSliderClosed(null);
              // }
            }.bind(this)}
            onTransitionEnd={function (e) {
              if (index === 0 && !firstPicLoaded && showImages && imgReady && showSideImages) {
                this.firstPicLoadedFunc();
              }

              if (setExpandedPic && imgDataCollectionMode) {
                // console.log("expanded width", e.target.clientWidth);
                images[index].expandedHeightValue = e.target.clientHeight;
                images[index].expandedWidthValue = e.target.clientWidth;

                var { x, y } = this.imgRef.current.getBoundingClientRect();

                images[index].expandedOffsetHeight = y;
                images[index].expandedOffsetWidth = x;

                this.updateImages(images);
                // if (!showSideImages && imgReady) this.showSideImagesFunc();

                this.setState(
                  { setExpandedPic: false },
                  function () {
                    this.setState({ imgDataCollectionMode: false });
                  }.bind(this)
                );
              } else if (!setExpandedPic && !imgDataCollectionMode) {
                setTimeout(
                  function () {
                    this.setImgReady();
                    this.setState({ imgReady: true });
                  }.bind(this),
                  10
                );
              }

              if (imgExpanded && !imgCentered) {
                this.setState({ imgCentered: true });
                var { x, y } = this.imgRef.current.getBoundingClientRect();
                // console.log("pos", x, y);

                // this.imgRef.current.style.transform = `translateX(calc(${-x}px + 50vw - ${this.imgRef.current.offsetWidth / 2}px)) translateY(calc(${-y}px + 50vh - ${this.imgRef.current.offsetHeight / 2}px))`;

                // this.imgRef.current.style.transform = `translateX(calc(${-x}px + 50vw - ${images[index].expandedWidthValue / 2}px)) translateY(calc(${-y}px + 50vh - ${images[index].expandedHeightValue / 2}px))`;
              }

              if (hideSideImages) {
                // console.log("hideSideImages");
                this.hideSliderFunc();
              }

              if (hideSideImages && !showImages && !this.props.styles.W_ImageSliderClosed && currentIndex === index) {
                this.props.setWImageSliderClosed(true);
                if (isMiscWorkItem) {
                  this.props.removeShadow();
                }
              }

              // console.log("img transition end controls", lockControls, index === currentIndex);
              if (lockControls && index === currentIndex && !imgDataCollectionMode) this.unlockControls();
            }.bind(this)}
            onClick={function (e) {
              // console.log(`images[index].domPath.offsetWidth - images[currentIndex].domPath.offsetWidth) / 2}px) scale(.5, .5)`)
              // console.log(`${images[index].domPath.offsetWidth} - ${images[currentIndex].domPath.offsetWidth} / 2}px) scale(.5, .5)`)

              // var { x, y } = this.imgRef.current.getBoundingClientRect();
              // console.log("pos", x, y);
              // console.log("pos", `translateX(calc(${-x} + 50vw)px) translateY(calc(${-y} + 50vh)px)`);

              // console.log("focus: ", document.activeElement);

              if (!imgExpanded && currentIndex === index) {
                this.setState(
                  { imgExpanded: true },
                  function () {
                    if (window.innerWidth > 1400) {
                      this.imgRef.current.style.transform = images[currentIndex].centeredTransform;
                    }
                  }.bind(this)
                );
              } else if (imgExpanded) {
                this.setState(
                  { imgExpanded: false },
                  function () {
                    this.imgRef.current.style.transform = "unset";
                  }.bind(this)
                );
              } else if (!imgExpanded && currentIndex !== index) {
                this.setCurrentIndex(index);
              }
            }.bind(this)}
            // onTouchStart={function() {

            // }}

            style={{
              transform:
                index === currentIndex - 1 && images[index].domPath && showSideImages && firstPicLoaded
                  ? `translateX(${imageItem.rightDistance}px) scale(.5, .5) rotateY(65deg) translateZ(0px)`
                  : index === currentIndex + 1 && imageItem.domPath && showSideImages && firstPicLoaded
                  ? `translateX(${imageItem.leftDistance}px) scale(.5, .5) rotateY(-65deg) translateZ(0px)`
                  : "",
            }}
          ></img>
        </Swipeable>
        {/* </div> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    styles: state.styles,
  };
}

export default connect(mapStateToProps, { setWImageSliderClosed })(W_ImageSliderItem);
// export default W_ImageSliderItem;
