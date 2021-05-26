import React, { Component, useRef } from "react";
import WorkItem_Minimized from "./WorkItem_New/WorkItem_Minimized/WorkItem_Minimized";
import "./W_Slider.scss";
import "./W_SliderMobile.css";
import "./WorkItem_New/WorkItem_Minimized/WorkItem_Minimized.css";
import "./WorkItem_New/WorkItem_Minimized/WorkItem_MinimizedMobile.css";
import "./WorkItem_New/WorkItem_New.scss";
import "./WorkItem_New/WorkItem_NewMobile.css";
import "./WorkItem_New/WorkItem2_New.scss";
import "./WorkItem_New/WorkItemGZ.scss";
import "./WorkItem_New/WorkItemRSG.scss";
import "./WorkItem_New/WorkItemProjectOrganizer.scss";
import isEmpty from "../../is-empty";
import classnames from "classnames";
// import { useSwipeable, Swipeable } from "react-swipeable";

import SwiperCore, { Navigation, EffectCoverflow } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/swiper-bundle.css";
import FingerPointerMotionBlur from "../FingerPointerMotionBlur/FingerPointerMotionBlur";
import { connect } from "react-redux";
import { setFingerPointerMotionBlurDismissed } from "../../actions/stylesActions";
import { v4 as uuidv4 } from "uuid";
import W_Chunk from "./W_Chunk";

SwiperCore.use([Navigation, EffectCoverflow]);

class W_Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastPage: 0,
      currentPageAnim: 0,
    };

    this.returnSliderOffsetFunc = this.props.returnSliderOffsetFunc;
    this.return_W_Item_Pos = this.props.return_W_Item_Pos;
    this.setSliderPage = this.props.setSliderPage;

    // this.updateSliderHeight = this.updateSliderHeight.bind(this);
    this.showFingerInstructionFunc = this.showFingerInstructionFunc.bind(this);

    // refs
    this.sliderRef = React.createRef();
    this.swiperRef = {};
  }

  componentDidMount() {
    const { paginatedWorkItems } = this.props;
    var uniqueIDs = [];
    for (var i = 0; i < paginatedWorkItems.length; i++) {
      uniqueIDs.push(uuidv4());
    }
    this.setState({ uniqueIDs });

    var { x, y } = this.sliderRef.current.getBoundingClientRect();
    var documentY = window.scrollY;
    // console.log(y + documentY);
    // console.log(x);

    var sliderOffsetX = x;
    var sliderOffsetY = y + documentY;

    this.setState({ sliderOffsetX, sliderOffsetY });
    this.returnSliderOffsetFunc(sliderOffsetX, sliderOffsetY);

    if (!this.props.styles.isTouchScreen) this.props.setFingerPointerMotionBlurDismissed(true);

    // const { paginatedWorkItems } = this.props;
    // this.setState({ workItem: paginatedWorkItems[0][0] });

    // setTimeout(() => {
    //     this.swiperRef.slideTo(1);
    // }, 1000);
  }

  componentDidUpdate() {
    const { currentPage } = this.props;
    if (currentPage !== this.state.currentPage) {
      this.setState({ lastPage: this.state.currentPage, currentPage, readyToShowMiniWorkItem: false });
      try {
        this.swiperRef.slideTo(currentPage);
      } catch (err) {}
    }
  }

  showFingerInstructionFunc() {
    setTimeout(
      function () {
        this.setState({ showFingerInstruction: true });
      }.bind(this),
      500
    );
  }

  render() {
    // const { workItemsSubArray } = this.state;
    const {
      sliderOffsetY,
      sliderOffsetX,
      showFingerInstruction,
      workItem,
      readyToShowMiniWorkItem,
      hideOtherWorkItems,
      currentPageAnim,
      lastPage,
      uniqueIDs,
    } = this.state;
    const { paginatedWorkItems, selected_W_Item, currentPage } = this.props;
    const { isFingerPointerMotionBlurDismissed, isWorkItemOpen } = this.props.styles;

    return (
      <div className="W_Slider" ref={this.sliderRef}>
        {showFingerInstruction && !isFingerPointerMotionBlurDismissed ? <FingerPointerMotionBlur /> : null}

        <Swiper
          // navigation={{
          //     prevEl: ".W_SliderButton.prev",
          //     nextEl: ".W_SliderButton.next"
          // }}
          // pagination
          // loop={true}
          speed={1000}
          spaceBetween={0}
          slidesPerView={1}
          onSliderFirstMove={function (e) {
            // console.log("slide transition start");
            this.setState({ hideOtherWorkItems: false });
          }.bind(this)}
          onSlideChangeTransitionEnd={function (e) {
            // console.log("page", this.props.currentPage)
            // this.setSliderPage(e.activeIndex);
            // console.log("onslideend", e);
            this.setState({ readyToShowMiniWorkItem: true, hideOtherWorkItems: true, currentPageAnim: this.props.currentPage });
          }.bind(this)}
          onSlideChange={function (e) {
            // console.log('slide change', this.props.currentPage);
            // this.setSliderPage(--currentPage);
            // console.log("slide change");
            this.setSliderPage(e.activeIndex);
          }.bind(this)}
          onSwiper={function (swiper) {
            // console.log(swiper)
            this.swiperRef = swiper;
          }.bind(this)}
          effect="coverflow"
          coverflowEffect={{
            rotate: 80,
            slideShadows: false,
          }}
          className="W_SliderInnerWrapper"
        >
          {!isEmpty(paginatedWorkItems) &&
            !isEmpty(uniqueIDs) &&
            paginatedWorkItems.map(
              function (workItemArray, workItemArrayIndex) {
                return (
                  <SwiperSlide key={uniqueIDs[workItemArrayIndex]} className="slideDiv">
                    <W_Chunk
                      workItemArray={workItemArray}
                      workItemArrayIndex={workItemArrayIndex}
                      isWorkItemOpen={isWorkItemOpen}
                      currentPage={currentPage}
                      currentPageState={this.state.currentPage}
                      currentPageAnim={currentPageAnim}
                      selected_W_Item={selected_W_Item}
                      readyToShowMiniWorkItem={readyToShowMiniWorkItem}
                      sliderOffsetY={sliderOffsetY}
                      sliderOffsetX={sliderOffsetX}
                      showFingerInstructionFunc={this.showFingerInstructionFunc}
                      return_W_Item_Pos={this.return_W_Item_Pos}
                    />
                  </SwiperSlide>
                );
              }.bind(this)
            )}
        </Swiper>

        {/* <p className="sliderDimensions">h {this.state.sliderHeight}</p>
                    <p className="sliderDimensions">w {this.state.sliderWidth}</p> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    styles: state.styles,
  };
}

export default connect(mapStateToProps, { setFingerPointerMotionBlurDismissed })(W_Slider);
// export default W_Slider;
