import React, { Component } from "react";
import "./W_ImageSlider.scss";
import "./W_ImageSliderMobile.css";
import classnames from "classnames";
import W_ImageSliderItem from "./W_ImageSliderItem";
import W_ImageSliderRadioItem from "./W_ImageSliderRadioItem";
import isEmpty from "../../is-empty";
import { connect } from "react-redux";
import { setCursorBtn } from "../../actions/stylesActions";
import ClosingButtonMasked from "../ClosingButtonMasked/ClosingButtonMasked";
import { v4 as uuidv4 } from "uuid";

class W_ImageSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      allWidthsSet: true,
      allWidthsSetState: false,
      numberOfReadyImages: 0,
      lockControls: true,
    };

    this.hideSliderFunc = this.hideSliderFunc.bind(this);
    this.updateImages = this.updateImages.bind(this);
    this.setCurrentIndex = this.setCurrentIndex.bind(this);
    this.unlockControls = this.unlockControls.bind(this);
    this.setImgReady = this.setImgReady.bind(this);
    this.firstPicLoadedFunc = this.firstPicLoadedFunc.bind(this);

    this.removeShadow = this.props.removeShadow;

    // refs
    this.groupRef = React.createRef();
    this.sliderRef = React.createRef();
  }

  componentDidMount() {
    if (!isEmpty(this.props.images) && isEmpty(this.state.images))
      this.setState({ images: this.props.images }, function () {
        setTimeout(
          function () {
            this.setState({ showImages: true });
          }.bind(this),
          1000
        );

        var uniqueIDs = [];
        for (var i = 0; i < this.props.images.length; i++) {
          uniqueIDs.push(uuidv4());
        }
        this.setState({ uniqueIDs });
      });

    window.addEventListener(
      "keydown",
      function (e) {
        var { currentIndex } = this.state;
        if (e.keyCode === 37) {
          currentIndex--;
          this.setCurrentIndex(currentIndex);
        } else if (e.keyCode === 39) {
          currentIndex++;
          this.setCurrentIndex(currentIndex);
        }
        // else if (e.keyCode === 27) { }
      }.bind(this)
    );
  }

  hideSliderFunc() {
    this.setState({ showImages: false });
  }

  updateImages(images) {
    this.setState({ images });
  }

  setCurrentIndex(currentIndex) {
    const { lockControls } = this.state;
    if (lockControls) return;

    const imagesLength = this.props.images.length;
    if (currentIndex < 0) currentIndex = imagesLength - 1;
    else if (currentIndex > imagesLength - 1) currentIndex = 0;
    // console.log("lock controls");
    this.setState({ currentIndex, lockControls: true });
  }

  unlockControls() {
    // console.log("unlock controls");
    this.setState({ lockControls: false });
  }

  setImgReady() {
    var { images, numberOfReadyImages } = this.state;
    numberOfReadyImages++;
    if (numberOfReadyImages === images.length) {
      this.setState({ showSideImages: true });
    } else this.setState({ numberOfReadyImages });
  }

  firstPicLoadedFunc() {
    this.setState(
      { firstPicLoaded: true },
      function () {
        // this.groupRef.current.childNodes[0].childNodes[0].focus();
      }.bind(this)
    );
  }

  componentDidUpdate() {
    var { allWidthsSet, allWidthsSetState, currentIndex } = this.state;

    if (!isEmpty(this.props.images) && isEmpty(this.state.images))
      this.setState({ images: this.props.images }, function () {
        setTimeout(
          function () {
            this.setState({ showImages: true });
          }.bind(this),
          1000
        );
      });

    if (!isEmpty(this.state.images)) {
      var { images } = this.state;

      if (allWidthsSet)
        for (var i = 0; i < images.length; i++) {
          if (isEmpty(images[i].widthValue)) {
            allWidthsSet = false;
            break;
          }
        }

      if (allWidthsSet && !allWidthsSetState) {
        for (var i = 0; i < images.length; i++) {
          if (!isEmpty(images[i - 1])) {
            if (images[i].widthValue < images[i].heightValue)
              images[i].leftDistance =
                (images[i].widthValue / 2 - images[i - 1].widthValue) / 2 + images[i - 1].widthValue / 2 + images[i - 1].widthValue / 2 + 5;
            else if (images[i].widthValue >= images[i].heightValue) {
              if (images[i - 1].widthValue < images[i - 1].heightValue) {
                images[i].leftDistance =
                  (images[i].widthValue / 2 - images[i - 1].widthValue) / 2 +
                  images[i - 1].widthValue / 2 +
                  images[i - 1].widthValue / 2 -
                  30;
              } else if (images[i - 1].widthValue >= images[i - 1].heightValue) {
                images[i].leftDistance =
                  (images[i].widthValue / 2 - images[i - 1].widthValue) / 2 +
                  images[i - 1].widthValue / 2 +
                  images[i - 1].widthValue / 2 -
                  20;
              }
            }
          }
          if (!isEmpty(images[i + 1])) {
            if (images[i].widthValue > images[i].heightValue) {
              if (images[i + 1].widthValue > images[i + 1].heightValue) {
                images[i].rightDistance = -(
                  (images[i].widthValue / 2 - images[i + 1].widthValue) / 2 +
                  images[i + 1].widthValue / 2 +
                  images[i + 1].widthValue / 2 -
                  40
                );
              } else if (images[i + 1].widthValue <= images[i + 1].heightValue) {
                images[i].rightDistance = -(
                  (images[i].widthValue / 2 - images[i + 1].widthValue) / 2 +
                  images[i + 1].widthValue / 2 +
                  images[i + 1].widthValue / 2 -
                  50
                );
              }
            } else if (images[i].widthValue <= images[i].heightValue)
              images[i].rightDistance = -(
                (images[i].widthValue / 2 - images[i + 1].widthValue) / 2 +
                images[i + 1].widthValue / 2 +
                images[i + 1].widthValue / 2
              );
          }
        }

        // console.log(images);
        // console.log("allwidths: ", allWidthsSet);

        this.setState({ allWidthsSetState: true, images });
      }

      if (this.state.allWidthsSetState && !this.state.centeredTransformSet) {
        var { images } = this.state;
        var allTransformSet = true;
        for (var j = 0; j < images.length; j++) {
          allTransformSet = false;
          if (isEmpty(images[j].centeredTransform) && !isEmpty(images[j].expandedOffsetHeight && !isEmpty(images[j].expandedOffsetWidth))) {
            // console.log("transform");
            images[j].centeredTransform = `translateX(calc(${-images[j].expandedOffsetWidth}px + 50vw - ${
              images[j].expandedWidthValue / 2
            }px)) 
                        translateY(calc(${-images[j].expandedOffsetHeight}px + 50vh - ${images[j].expandedHeightValue / 2}px))`;
          }
        }
        if (allTransformSet === true) this.setState({ images, centeredTransformSet: true });
      }

      const { closeWorkItem } = this.props;
      // if (this.props.showImages && !this.state.showImages) this.setState({ showImages: true, hideSideImages: false });
      // else if (!this.props.showImages && this.state.showImages && !this.state.hideSideImages) this.setState({ hideSideImages: true });

      // if (this.props.showImages && !this.state.showImages) this.setState({ showImages: true, hideSideImages: false });
      if (closeWorkItem && this.state.showImages && !this.state.hideSideImages) this.setState({ hideSideImages: true });

      if (document.activeElement === this.sliderRef.current && this.groupRef && this.groupRef.current) {
        this.groupRef.current.childNodes[currentIndex].childNodes[0].focus();
      }
    }
  }

  render() {
    const { images, showImages, showSideImages, allWidthsSetState, firstPicLoaded, hideSideImages, lockControls, uniqueIDs } = this.state;
    var { currentIndex } = this.state;
    const { workItemInPosition, isMiscWorkItem } = this.props;

    return (
      <div
        className={classnames("W_ImageSliderWrapperOuter", {
          W_ImageSliderWrapperOuterHide: this.props.styles.W_ImageSliderClosed,
          W_ImageSliderMisc: isMiscWorkItem,
        })}
        onWheel={function (e) {
          // console.log("onwheel Y", e.deltaY);
          // console.log("onwheel X", e.deltaX);

          if (lockControls) return;
          else if (Math.abs(e.deltaY) > 0) {
            // console.log("onwheel Y", Math.sign(e.deltaY));
            if (Math.sign(e.deltaY) === 1) {
              currentIndex--;
              this.setCurrentIndex(currentIndex);
            } else if (Math.sign(e.deltaY) === -1) {
              currentIndex++;
              this.setCurrentIndex(currentIndex);
            }
          } else if (Math.abs(e.deltaX) > 0) {
            // console.log("onwheel X", Math.sign(e.deltaX));
            if (Math.sign(e.deltaX) === 1) {
              currentIndex--;
              this.setCurrentIndex(currentIndex);
            } else if (Math.sign(e.deltaX) === -1) {
              currentIndex++;
              this.setCurrentIndex(currentIndex);
            }
          }
        }.bind(this)}
      >
        {isMiscWorkItem ? <ClosingButtonMasked showButton={!this.props.closeWorkItem} /> : null}
        <div
          className="W_ImageSliderWrapper"
          ref={this.sliderRef}
          tabIndex={-1}
          onClick={function (e) {
            e.stopPropagation();
          }.bind(this)}
          onKeyPress={function (e) {
            e.stopPropagation();

            // console.log("key", e.keyCode);
            if (e.keyCode === 37 && currentIndex === 0) {
              this.setState({ currentIndex: images.length - 1 });
            } else if (e.keyCode === 39 && currentIndex === images.length - 1) {
              this.setState({ currentIndex: 0 });
            } else if (e.keyCode === 37 && currentIndex > 0) {
              this.setState({ currentIndex: currentIndex - 1 });
            } else if (e.keyCode === 39 && currentIndex < images.length - 1) {
              this.setState({ currentIndex: currentIndex + 1 });
            }
          }.bind(this)}
        >
          <div className="W_ImageSliderInnerWrapper">
            <div className="W_ImageSliderContainer">
              {!isEmpty(images) &&
                !isEmpty(uniqueIDs) && // (workItemInPosition || isMiscWorkItem)
                images.map(
                  function (imageItem, index) {
                    return (
                      <W_ImageSliderItem
                        key={uniqueIDs[index]}
                        images={images}
                        index={index}
                        imageItem={imageItem}
                        currentIndex={currentIndex}
                        showImages={showImages}
                        showSideImages={showSideImages}
                        hideSliderFunc={this.hideSliderFunc}
                        updateImages={this.updateImages}
                        setImgReady={this.setImgReady}
                        firstPicLoadedFunc={this.firstPicLoadedFunc}
                        firstPicLoaded={firstPicLoaded}
                        hideSideImages={hideSideImages}
                        hideSliderFunc={this.hideSliderFunc}
                        setCurrentIndex={this.setCurrentIndex}
                        unlockControls={this.unlockControls}
                        lockControls={lockControls}
                        isMiscWorkItem={isMiscWorkItem}
                        removeShadow={this.removeShadow}
                      />
                    );
                  }.bind(this)
                )}
            </div>

            {firstPicLoaded ? (
              // !isEmpty(images)
              <div
                className="W_ImageSliderRadioGroup"
                ref={this.groupRef}
                // onMouseOver={function (e) {
                //     if (!this.props.styles.isCursorOnBtn) {
                //         this.props.setCursorBtn(true);
                //     }

                // }.bind(this)}

                // onMouseLeave={function () {
                //     if (this.props.styles.isCursorOnBtn) {
                //         this.props.setCursorBtn(false);
                //     }
                // }.bind(this)}
              >
                {!isEmpty(uniqueIDs) &&
                  images.map(
                    function (imageItem, index) {
                      return (
                        <W_ImageSliderRadioItem
                          key={uniqueIDs[index] + "_radio"}
                          index={index}
                          currentIndex={currentIndex}
                          imageItem={imageItem}
                          showImages={showImages}
                          allWidthsSetState={allWidthsSetState}
                          setCurrentIndex={this.setCurrentIndex}
                          hideRadioGroup={hideSideImages}
                        />
                      );
                    }.bind(this)
                  )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    styles: state.styles,
  };
}

export default connect(mapStateToProps, { setCursorBtn })(W_ImageSlider);
// export default W_ImageSlider;
