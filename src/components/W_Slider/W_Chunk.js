import React, { Component } from "react";
import isEmpty from "../../is-empty";
import MiniWorkItemWrapper from "../MiniWorkItem/MiniWorkItemWrapper";
import WorkItem_Minimized from "./WorkItem_New/WorkItem_Minimized/WorkItem_Minimized";

class W_Chunk extends Component {
  render() {
    const {
      workItemArray,
      workItemArrayIndex,
      isWorkItemOpen,
      currentPage,
      currentPageState,
      currentPageAnim,
      selected_W_Item,
      readyToShowMiniWorkItem,
      sliderOffsetY,
      sliderOffsetX,
    } = this.props;

    return (
      <div className="workItemsChunk">
        {workItemArray.map(
          function (workItem, index) {
            return (isWorkItemOpen || Math.abs(currentPage - workItemArrayIndex) > 1) &&
              workItemArrayIndex !== currentPageAnim ? null : workItem.misc ? (
              <MiniWorkItemWrapper
                key={workItem.key}
                workItem={workItem}
                workItemClass={workItem.miniWorkItemClass}
                index={index}
                return_W_Item_Pos={this.props.return_W_Item_Pos}
                selected_W_Item={selected_W_Item}
                largeWorkItemClosed={isEmpty(selected_W_Item)}
                showWorkItem_Min={workItemArrayIndex === currentPageState && readyToShowMiniWorkItem}
                // hideWorkItem={workItemArrayIndex !== currentPageState && !hideOtherWorkItems}
              />
            ) : (
              <WorkItem_Minimized
                key={workItem.key}
                workItem={workItem}
                workItemClass={workItem.workItemClass}
                index={index}
                sliderOffsetY={sliderOffsetY}
                sliderOffsetX={sliderOffsetX}
                return_W_Item_Pos={this.props.return_W_Item_Pos}
                selected_W_Item={selected_W_Item}
                largeWorkItemClosed={isEmpty(selected_W_Item)}
                showFingerInstructionFunc={this.props.showFingerInstructionFunc}
                showWorkItem_Min={workItemArrayIndex === currentPageState && readyToShowMiniWorkItem}
                // hideWorkItem={workItemArrayIndex !== currentPageState && !hideOtherWorkItems}
              />
            );
          }.bind(this)
        )}
      </div>
    );
  }
}

export default W_Chunk;
