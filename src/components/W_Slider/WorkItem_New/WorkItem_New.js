import React, { Component } from "react";
import classnames from "classnames";
import WorkItemTitle from "./WorkItemTitle/WorkItemTitle";
import WorkItemImage from "./WorkItemImage/WorkItemImage";
import isEmpty from "../../../is-empty";

import { setCursorBtn, setPullNavBtnContainerHidden, setWorkItemOpen } from "../../../actions/stylesActions";
import { connect } from "react-redux";
import DescriptionOfWork from "./DescriptionOfWork/DescriptionOfWork";
import BlockDescription from "./BlockDescription/BlockDescription";
import WorkItemLink from "./WorkItemLink/WorkItemLink";

class WorkItem_New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstOpacityAnim: false,
    };

    this.closeWorkItemFunc = this.props.closeWorkItemFunc;
    this.removeShadow = this.props.removeShadow;
    this.notifyWorkItemInPosition = this.props.notifyWorkItemInPosition;

    // refs
    this.divRef = React.createRef();
  }

  componentDidMount() {
    this.props.setWorkItemOpen(true);

    const { W_Item_OffsetX, W_Item_OffsetY } = this.props;
    const { isMobileMode, browserName } = this.props.styles;

    if (!(isMobileMode || browserName !== "chrome")) {
      // console.log("mount work item position");
      this.divRef.current.style.transform = `translateX(${W_Item_OffsetX}px) translateY(${W_Item_OffsetY}px)`;
    } else if (isMobileMode || browserName !== "chrome") {
      setTimeout(
        function () {
          this.setState({ expandWrapper: true });
        }.bind(this),
        10
      );
    }

    // this.divRef.current.style.top = `${W_Item_OffsetY}px`;
    // this.divRef.current.style.left = `${W_Item_OffsetX}px`;

    const { imageSrc } = this.props.workItem;
    var img;
    if (isEmpty(imageSrc)) img = null;
    else {
      img = new Image();
      img.src = imageSrc;
    }
    this.setState({ img });

    window.addEventListener(
      "orientationchange",
      function (e) {
        this.setState({ screenOrientation: e.target.screen.orientation.angle });
        // // console.log("the orientation of the device is now " + e.target.screen.orientation.angle);
        // if (e.target.screen.orientation.angle === 90 && window.innerWidth <= 1400) {
        //     try {
        //         setTimeout(() => {
        //             this.divRef.current.style.transform = `translateY(50px) translateX(calc(50vw - ${this.divRef.current.clientWidth / 2}px))`;
        //         }, 10);
        //     } catch (err) { console.log("error aligning WorkItem_New upon orientation change", err); }
        // }
      }.bind(this)
    );

    this.props.setPullNavBtnContainerHidden(true);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.closeWorkItemWrapper !== prevState.closeWorkItemWrapper) {
      return {
        closeWorkItemWrapper: nextProps.closeWorkItemWrapper,
      };
    }

    return null;
  }

  componentDidUpdate() {
    const { imagesNotFound, closeWorkItem, closeWorkItemWrapper, W_Item_OffsetX, W_Item_OffsetY } = this.props;
    if (closeWorkItemWrapper && !this.state.returnedToPosition) {
      // console.log('closing1');
      this.setState({ returnedToPosition: true, removeAngle: false });
      this.divRef.current.style.transform = `translateX(${W_Item_OffsetX}px) translateY(${W_Item_OffsetY}px)`;
    }

    if (closeWorkItemWrapper && !this.state.shadowRemoved) {
      this.setState({ shadowRemoved: true });
      this.removeShadow();
    }

    const { assembleItem, expandWrapper } = this.state;
    if (closeWorkItem && !assembleItem && expandWrapper) {
      // console.log('closing2');
      this.setState({ expandWrapper: false, removeAngle: false });
      this.divRef.current.style.transform = `translateX(${W_Item_OffsetX}px) translateY(${W_Item_OffsetY}px)`;
      this.removeShadow();
    }

    if (closeWorkItem && this.props.styles.W_ImageSliderClosed === true && !this.state.closeWorkItem) {
      // console.log("this.props.styles.W_ImageSliderClosed", this.props.styles.W_ImageSliderClosed);
      this.setState({ closeWorkItem: true });
    } else if (closeWorkItem && imagesNotFound && !this.state.closeWorkItem) {
      this.setState({ closeWorkItem: true });
    }

    // if (closeWorkItem && !this.state.closeWorkItem) {
    //     console.log("this.props.styles.W_ImageSliderClosed", this.props.styles.W_ImageSliderClosed);
    //     this.setState({ closeWorkItem: true });
    // }
  }

  componentWillUnmount() {
    this.props.setPullNavBtnContainerHidden(false);
    this.props.setWorkItemOpen(false);
  }

  render() {
    const { test, workItem, workItemClass, index, sliderOffsetY, sliderOffsetX, closeWorkItemWrapper, imagesNotFound } = this.props;
    const { removeAngle, expandWrapper, assembleItem, img, returnedToPosition, closeWorkItem, screenOrientation } = this.state;
    const { isMobileMode, browserName } = this.props.styles;

    return (
      <div
        className={classnames("workItemWrapper", {
          [workItemClass]: workItemClass,
          workItemWrapperPerformance: isMobileMode || browserName !== "chrome",
          workItemWrapperExpand: expandWrapper && !closeWorkItemWrapper,
          workItemWrapperExpandPerformance: expandWrapper && !closeWorkItemWrapper && (isMobileMode || browserName !== "chrome"),
          workItemWrapperPerformanceClose: (isMobileMode || browserName !== "chrome") && closeWorkItem,
          opacityAnim: !isMobileMode && browserName === "chrome",
          opacityAnimPerformance: isMobileMode || browserName !== "chrome",
          linkExists: !isEmpty(workItem.link),
        })}
        ref={this.divRef}
        onAnimationEndCapture={function (e) {
          if (e.target === this.divRef.current && !expandWrapper) {
            // console.log("expand wrapper");
            this.setState(
              {
                expandWrapper: true,
                removeAngle: true,
              },
              function () {
                if (window.innerWidth > 1400 && (isMobileMode || browserName !== "chrome")) {
                  this.divRef.current.style.transform = `translateY(50px) translateX(calc(5vw))`;
                } else if (window.innerWidth <= 1400 && !(isMobileMode || browserName !== "chrome"))
                  this.divRef.current.style.transform = `translateY(50px) translateX(calc(5vw))`;
                else {
                  if (imagesNotFound && !(isMobileMode || browserName !== "chrome"))
                    this.divRef.current.style.transform = `translateY(calc(50vh - 250px)) translateX(calc(50vw - 250px))`;
                  else this.divRef.current.style.transform = `translateY(calc(50vh - 250px))`;
                }
              }.bind(this)
            );
          }
        }.bind(this)}
        onTransitionEnd={function (e) {
          // if (removeAngle) this.setState({ expandWrapper: true });

          // console.log("work item transition end");
          if (expandWrapper && !assembleItem) {
            this.notifyWorkItemInPosition();
            // console.log("item in position")
            this.setState({ assembleItem: true });
            if (window.innerWidth <= 1400 && !(isMobileMode || browserName !== "chrome")) {
              this.divRef.current.style.transform = `translateY(50px) translateX(calc(50vw - ${this.divRef.current.clientWidth / 2}px))`;
            }
          }

          if (
            (screenOrientation === 90 || screenOrientation === 0) &&
            window.innerWidth <= 1400 &&
            !(isMobileMode || browserName !== "chrome")
          ) {
            this.divRef.current.style.transform = `translateY(50px) translateX(calc(50vw - ${this.divRef.current.clientWidth / 2}px))`;
          }

          if ((isMobileMode || browserName !== "chrome") && closeWorkItem) {
            // console.log("work item mobile closing");
            this.removeShadow();
          }
        }.bind(this)}
        onClick={function (e) {
          // console.log("workitem");
          e.stopPropagation();
          // console.log("client height click", this.divRef.current.clientHeight);
        }.bind(this)}
        onMouseOver={function (e) {
          e.stopPropagation();
          // if (!this.props.styles.isCursorOnBtn) this.props.setCursorBtn(true);
          if (this.props.styles.isCursorOnBtn) this.props.setCursorBtn(false);
        }.bind(this)}
      >
        <div
          className={classnames("workItem", {
            removeAngle: removeAngle,
            extend: assembleItem,
          })}
          onTransitionEnd={function (e) {
            e.stopPropagation();
          }.bind(this)}
        >
          <div className="workItemContent">
            <WorkItemTitle
              title={workItem.title}
              titleSubheader={workItem.titleSubheader}
              showTitle={assembleItem && !closeWorkItem}
              hideTitle={closeWorkItem}
              closeWorkItemFunc={this.closeWorkItemFunc}
              isMobileMode={this.props.styles.isMobileMode}
              browserName={this.props.styles.browserName}
            />
            <div className="W_imgAndDescription">
              <WorkItemImage
                img={img}
                assembleImage={assembleItem}
                largeWorkItem={true}
                closeWorkItem={closeWorkItem}
                title={workItem.title}
                isMobileMode={this.props.styles.isMobileMode}
                browserName={this.props.styles.browserName}
              />
              {assembleItem && this.props.styles.isWIImageLoaded ? (
                <DescriptionOfWork
                  descriptionOfWork={workItem.descriptionOfWork}
                  animateText={assembleItem}
                  closeWorkItem={closeWorkItem}
                  closeWorkItemFunc={this.closeWorkItemFunc}
                  isMobileMode={this.props.styles.isMobileMode}
                  browserName={this.props.styles.browserName}
                />
              ) : null}
            </div>
            {workItem.blocksDescriptionArray ? (
              <div className="attributesAndBlockDescriptionsWrapper">
                <BlockDescription
                  assembleFront={assembleItem}
                  blocksDescriptionArray={workItem.blocksDescriptionArray}
                  workItemClass={workItemClass}
                  closeWorkItem={closeWorkItem}
                  isMobileMode={this.props.styles.isMobileMode}
                  browserName={this.props.styles.browserName}
                />
              </div>
            ) : null}
          </div>
        </div>

        {workItem.link ? (
          <WorkItemLink link={workItem.link} freeHosting={workItem.freeHosting} extend={assembleItem && !closeWorkItem} />
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    styles: state.styles,
  };
}

export default connect(mapStateToProps, { setCursorBtn, setPullNavBtnContainerHidden, setWorkItemOpen })(WorkItem_New);
// export default WorkItem;
