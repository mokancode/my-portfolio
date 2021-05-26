import React, { Component } from "react";
import "./WorkItemImage.scss";
// import './WorkItemImageMobile.css';
import "./WorkItemImageMobile_V2.css";
import classnames from "classnames";
import isEmpty from "../../../../is-empty";
import { connect } from "react-redux";
import { setWIImageLoaded } from "../../../../actions/stylesActions";

class WorkItemImage extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    // refs
    this.imgRef = React.createRef();
    this.workItemImageBorderRef = React.createRef();
  }

  componentDidMount() {
    const { largeWorkItem } = this.props;
    if (largeWorkItem)
      setTimeout(
        function () {
          this.setState({ removeShadow: true });
        }.bind(this),
        10
      );
  }

  componentDidUpdate() {
    if (!isEmpty(this.props.img) && !isEmpty(this.props.img.src) && !this.state.imgSet) {
      this.setState({ imgSet: true });
      // console.log("img", this.props.img.src);
    }

    const { largeWorkItem, assembleImage } = this.props;
    if (!this.state.showImageBorder && largeWorkItem && assembleImage) {
      setTimeout(
        function () {
          this.setState({ showImageBorder: true });
        }.bind(this),
        10
      );
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.closeWorkItem !== prevState.closeWorkItem && !nextProps.isMobileMode && nextProps.browserName === "chrome") {
      return {
        closeWorkItem: nextProps.closeWorkItem,
      };
    }

    return null;
  }

  render() {
    const { img, largeWorkItem, title, isMobileMode, browserName } = this.props;
    const { closeWorkItem, showImg, removeShadow, showImageBorder } = this.state;

    return (
      <div
        className={classnames("workDescriptionImageWrapper", {
          workDescriptionImageWrapperRemoveShadow: removeShadow,
          largeWorkDescriptionImageWrapper: largeWorkItem,
          largeWorkDescriptionImageWrapperBorder: largeWorkItem && showImageBorder && !closeWorkItem,
          // || largeWorkItem && showImageBorder && (!closeWorkItem && !(isMobileMode || browserName !== "chrome"))
          workDescriptionImageWrapperShrink: closeWorkItem && !(isMobileMode || browserName !== "chrome"),
          workDescriptionImageWrapperPerformance: isMobileMode || browserName !== "chrome",
        })}
        onTransitionEnd={function (e) {
          e.stopPropagation();
          // if (largeWorkItem && assembleImage && !showImageBorder) this.setState({ showImageBorder: true });

          // if (largeWorkItem && showImageBorder && !closeWorkItem) console.log("border on");
        }.bind(this)}
      >
        <div
          className="workItemImageBorder"
          ref={this.workItemImageBorderRef}
          onTransitionEnd={function (e) {
            // if (largeWorkItem && assembleImage && !showImageBorder) this.setState({ showImageBorder: true });
            // if (
            //     // e.target === this.workItemImageBorderRef.current
            //     largeWorkItem && showImageBorder && !closeWorkItem
            // ) this.props.setWIImageLoaded(true);
            // console.log("border on");
          }.bind(this)}
        ></div>

        {img && img.src ? (
          <div
            className={classnames("workDescriptionImageInnerWrapper", {
              workDescriptionImageInnerWrapperShrink: closeWorkItem && !(isMobileMode || browserName !== "chrome"),
            })}
          >
            <img
              onLoad={function (e) {
                this.setState({ showImg: true });
              }.bind(this)}
              ref={this.imgRef}
              src={img.src}
              alt={`workItemImage_${title}`}
              className={classnames("workDescriptionImage", {
                workDescriptionImageShow: showImg,
                largeWorkDescriptionImageShow: largeWorkItem && showImg,
              })}
            ></img>
          </div>
        ) : !isEmpty(title) ? (
          <div className="imgSubtitute_TitleInitialWrapper">
            <p className="imgSubtitute_TitleInitial">{title.slice(0, 1)}</p>
          </div>
        ) : null}
        <span></span>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    styles: state.styles,
  };
}

export default connect(mapStateToProps, { setWIImageLoaded })(WorkItemImage);
// export default WorkItemImage;
