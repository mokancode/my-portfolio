import React, { Component } from "react";
import classnames from "classnames";
import WorkItemImage from "../WorkItemImage/WorkItemImage";
import isEmpty from "../../../../is-empty";

import { setCursorBtn } from "../../../../actions/stylesActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import WorkItemTitle from "../WorkItemTitle/WorkItemTitle";

class WorkItem_Minimized extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.return_W_Item_Pos = this.props.return_W_Item_Pos;
    this.notifyPageChangeAnimEnded = this.props.notifyPageChangeAnimEnded;
    this.showFingerInstructionFunc = this.props.showFingerInstructionFunc;

    // refs
    this.divRef = React.createRef();
  }

  componentDidMount() {
    // const { sliderRef } = this.props;
    // sliderRef = sliderRef.current;

    const { imageSrc } = this.props.workItem;
    var img;
    if (isEmpty(imageSrc)) img = null;
    else {
      img = new Image();
      img.src = imageSrc;
    }
    this.setState(
      { img },
      function () {
        setTimeout(
          function () {
            this.setState({ showWorkItem_Min: true });
          }.bind(this),
          50
        );
      }.bind(this)
    );
  }

  componentDidUpdate() {}

  render() {
    const { workItem, index, workItemClass, largeWorkItemClosed, selected_W_Item, notifyBeginPageChange, workItemsTurn, isInvisible } =
      this.props;
    const { workItemOpacityOff, img, showWorkItem_Min, showWorkItem_Min_Instant, showGradientShine, workItem_Min_OpacityOn_Instant } =
      this.state;
    const { isMobileMode, browserName, isFingerPointerMotionBlurDismissed } = this.props.styles;

    return (
      <a
        // href="#w"
        className={classnames("workItem_Min_Wrapper", {
          workItem_Min_OpacityOff:
            workItemOpacityOff &&
            !largeWorkItemClosed &&
            selected_W_Item.title === workItem.title &&
            !(isMobileMode || browserName !== "chrome"),
          [workItemClass]: workItemClass,
          [workItem.miniWorkItemClass]: !isEmpty(workItem.miniWorkItemClass),

          showGradientShine: showGradientShine && isFingerPointerMotionBlurDismissed,

          isInvisible: isInvisible,
        })}
        onTransitionEnd={function () {
          // onAnimationEnd={function () {
          if (showWorkItem_Min || (showWorkItem_Min_Instant && !showGradientShine)) {
            // console.log("show glassy gradient shine now");
            this.setState({ showGradientShine: true });
            this.showFingerInstructionFunc();
          }
        }.bind(this)}
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

        onClick={function (e) {
          // e.preventDefault();

          // this.props.history.push("#w")

          // console.log("offset x y ", sliderOffsetX, sliderOffsetY);

          var { x, y } = this.divRef.current.getBoundingClientRect();
          this.return_W_Item_Pos(x, y, workItem); // "return" means "send to parent component"
          this.setState({ workItemOpacityOff: true });

          return false;
        }.bind(this)}
      >
        <div ref={this.divRef} className="workItem_Min">
          <WorkItemTitle
            title={workItem.title}
            // titleSubheader={workItem.titleSubheader}
            showTitle={showWorkItem_Min}
            opacityOff={
              workItemOpacityOff &&
              !largeWorkItemClosed &&
              selected_W_Item.title === workItem.title &&
              !(isMobileMode || browserName !== "chrome")
            }
            // hideTitle={closeWorkItem}
            // closeWorkItemFunc={this.closeWorkItemFunc}
            // isMobileMode={this.props.styles.isMobileMode}
            // browserName={this.props.styles.browserName}
          />

          {/* <WorkItemImage img={workItem.imageSrc} workItemInnerFrameLoaded={true} /> */}
          <WorkItemImage img={img} title={workItem.title} />
        </div>
      </a>
    );
  }
}

function mapStateToProps(state) {
  return {
    styles: state.styles,
  };
}

export default withRouter(connect(mapStateToProps, { setCursorBtn })(WorkItem_Minimized));
// export default WorkItem_Minimized;
