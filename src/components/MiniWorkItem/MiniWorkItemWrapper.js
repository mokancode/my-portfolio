import React, { Component } from "react";
import classnames from "classnames";
import isEmpty from "../../is-empty";

import { setCursorBtn } from "../../actions/stylesActions";
import { connect } from "react-redux";
import ProjectOrganizer from "./ProjectOrganizer";
import ReflectiveGallery from "./ReflectiveGallery";
import "./MiniWorkItemWrapper.scss";

class MiniWorkItemWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.return_W_Item_Pos = this.props.return_W_Item_Pos;

    // refs
    this.divRef = React.createRef();
  }

  componentDidMount() {}

  componentDidUpdate() {
    const { showWorkItem_Min } = this.props;

    if (showWorkItem_Min && !this.state.showWorkItem_Min) {
      setTimeout(
        function () {
          this.setState({ showWorkItem_Min: true });
        }.bind(this),
        50
      );
    }
  }

  render() {
    const {
      nextWorkItem,
      test,
      workItem,
      index,
      sliderOffsetY,
      sliderOffsetX,
      workItemClass,
      largeWorkItemClosed,
      selected_W_Item,
      notifyBeginPageChange,
      workItemsTurn,
      direction,
    } = this.props;
    const { workItemOpacityOff, img, showWorkItem_Min, showWorkItem_Min_Instant } = this.state;

    return (
      <div
        className={classnames("workItem_Min_Wrapper miniWorkItemWrapper", {
          [workItemClass]: workItemClass,
        })}
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
        <div className="performanceShadow"></div>
        <div className="performanceBorder"></div>

        <div className="miniWorkItemInnerWrapper">
          {workItemClass === "reflectionImageSlider" ? <ReflectiveGallery showWorkItem={showWorkItem_Min} /> : null}
          {workItemClass === "projectOrganizer" ? (
            <ProjectOrganizer return_W_Item_Pos={this.return_W_Item_Pos} workItem={workItem} />
          ) : null}
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

export default connect(mapStateToProps, { setCursorBtn })(MiniWorkItemWrapper);
// export default WorkItem_Minimized;
