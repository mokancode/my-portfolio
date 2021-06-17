import React, { Component } from "react";
import "./W_Container.scss";
import "./W_ContainerMobile.css";
import classnames from "classnames";
import { v4 as uniqueID } from "uuid";
import isEmpty from "../../is-empty";

import { setCursorBtn, setWImageSliderClosed, setMyWorksTextReady, setWI_Full_WrapperShadowRedux } from "../../actions/stylesActions";
import { connect } from "react-redux";
import W_ImageSlider from "../W_ImageSlider/W_ImageSlider";

import images from "../W_ImageSlider/images";
import SpinnerDelayed from "../../Loaders/PortalSpinner/SpinnerDelayed";
import WorkItem_New from "./WorkItem_New/WorkItem_New";
import MobileSlideshowContainer from "../MobileSlideshow/MobileSlideshowContainer";
import { withRouter } from "react-router-dom";
import MyWorks from "../MyWorks/MyWorks";
import PerformanceCube from "../PerformanceCube/PerformanceCube";
import workItems from "./WorkItemsList";

class W_Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cubeSide: "front",
      currentPage: 0,
      itemsPerPage: 3, // how many work items per chunk
      workItemsTurn: true, // true = first set, false = next set
      miniWorkItems: [
        {
          title: "Reflection Image Slider",
          miniWorkItemClass: "reflectionImageSlider",
          // , blocksDescriptionArray: [{ firstWord: "Modern", sentence: "interface" }, { firstWord: "professional", sentence: "photography" }]
          // imageSrc: "./images/mango_iced_tea.jpg",
          // complexity: { value: 50, color: "blue" },
          // design: { value: 80, color: "green" }
          misc: true,
          key: uniqueID(),
        },
        // , {
        //     title: "Project Organizer",
        //     miniWorkItemClass: "projectOrganizer",
        //     // , blocksDescriptionArray: [{ firstWord: "Modern", sentence: "interface" }, { firstWord: "professional", sentence: "photography" }]
        //     // imageSrc: "./images/mango_iced_tea.jpg",
        //     // complexity: { value: 50, color: "blue" },
        //     // design: { value: 80, color: "green" }
        //     misc: true,
        //     key: uniqueID(),
        //     link: "https://project-organizer-mokancode.herokuapp.com/"
        // }
      ],
    };

    this.returnSliderOffsetFunc = this.returnSliderOffsetFunc.bind(this);
    this.return_W_Item_Pos = this.return_W_Item_Pos.bind(this);
    this.setSliderPage = this.setSliderPage.bind(this);
    this.closeWorkItemFunc = this.closeWorkItemFunc.bind(this);
    this.removeShadow = this.removeShadow.bind(this);
    this.notifyWorkItemInPosition = this.notifyWorkItemInPosition.bind(this);
    this.setImageSliderClosed = this.setImageSliderClosed.bind(this);

    this.revealSliderWorkItemsFunc = this.revealSliderWorkItemsFunc.bind(this);

    // refs
    this.W_Item_Full_WrapperRef = React.createRef();
  }

  componentDidMount() {
    if (!isEmpty(images) && isEmpty(this.state.images)) this.setState({ images });

    const { miniWorkItems, itemsPerPage } = this.state;

    var paginatedWorkItems = [];
    for (var i = 0; i < workItems.length; i += itemsPerPage) paginatedWorkItems.push(workItems.slice(i, i + itemsPerPage));

    var paginatedMiniWorkItems = [];
    for (var i = 0; i < miniWorkItems.length; i += itemsPerPage) paginatedMiniWorkItems.push(miniWorkItems.slice(i, i + itemsPerPage));

    paginatedWorkItems = paginatedWorkItems.concat(paginatedMiniWorkItems);

    this.setState({
      paginatedWorkItems,
      numberOfPages: paginatedWorkItems.length,
      miniWorkItemsStartingPageIndex: paginatedWorkItems.length - 1,
    });

    // console.log("paginated work items", paginatedWorkItems);

    window.addEventListener(
      "keydown",
      function (e) {
        const { isMiscWorkItemOpen } = this.props.styles;
        if (isMiscWorkItemOpen) return;
        if (e.keyCode === 27) {
          // console.log("close");
          this.setState({ closeWorkItem: true });
          if (this.props.styles.isCursorOnBtn) this.props.setCursorBtn(false);
        }
      }.bind(this)
    );

    this.setState({ windowWidth: window.innerWidth });
    window.addEventListener(
      "resize",
      function (e) {
        this.setState({ windowWidth: window.innerWidth });
      }.bind(this)
    );

    // const { visitedPages } = this.props.styles;
    // if (visitedPages.indexOf(String("landing").toLocaleLowerCase()) === -1) {
    //     setTimeout(function () {
    //         this.setState({ uncoverLogo: true, particlesDivAdjustZIndex: true });
    //     }.bind(this), 2000);
    // } else this.setState({ uncoverLogo: true, particlesDivAdjustZIndex: true });
  }

  componentWillUnmount() {
    this.props.setMyWorksTextReady(false);
  }

  returnSliderOffsetFunc(sliderOffsetX, sliderOffsetY) {
    this.setState({ sliderOffsetX, sliderOffsetY });
  }

  return_W_Item_Pos(W_Item_OffsetX, W_Item_OffsetY, selected_W_Item, isMiscWorkItem) {
    this.setState({ W_Item_OffsetX, W_Item_OffsetY, selected_W_Item, isMiscWorkItem }, function () {
      setTimeout(
        function () {
          // this.setState({ adjustZIndex_ForWorkItem: true }, function () {
          setTimeout(
            function () {
              this.setState({ W_Item_Full_WrapperShadow: true });
            }.bind(this),
            10
          );
          // }.bind(this))
        }.bind(this),
        100
      );
    });
  }

  // updates currently showing items and prepares arrays of items to the left and right upon switching page
  setSliderPage(sliderPage) {
    var { numberOfPages } = this.state;
    if (sliderPage > numberOfPages - 1) sliderPage = 0;
    else if (sliderPage < 0) sliderPage = numberOfPages - 1;
    this.setState({ currentPage: sliderPage });
  }

  closeWorkItemFunc(titleHidden, descTextHidden) {
    // return;
    /** This function works by waiting for a counter to reach a number before it proceeds to close the div.
     *  The counter represents the components within the WorkItem that have been hidden.
     */

    // console.log(`close ${titleHidden} ${descTextHidden}`);

    if (titleHidden) {
      // console.log("closeFunc hiding title");
      if (this.state.descTextHidden)
        setTimeout(
          function () {
            this.setState({ closeWorkItemWrapper: true, titleHidden: false, descTextHidden: false });
          }.bind(this),
          200
        );
      else {
        // console.log("closeFunc closing after title")
        this.setState({ titleHidden: true });
      }
    } else if (descTextHidden) {
      // console.log("closeFunc hiding desc");
      if (this.state.titleHidden)
        setTimeout(
          function () {
            this.setState({ closeWorkItemWrapper: true, titleHidden: false, descTextHidden: false });
          }.bind(this),
          200
        );
      else {
        // console.log("closeFunc closing after desc")
        this.setState({ descTextHidden: true });
      }
    }
  }

  removeShadow() {
    this.setState({ W_Item_Full_WrapperShadow: false });
  }

  componentDidUpdate() {
    const { selected_W_Item, W_Item_Full_WrapperShadow, filteredImages, imagesNotFound, closeWorkItem } = this.state;

    if (!isEmpty(images) && isEmpty(this.state.images)) this.setState({ images });

    if (!isEmpty(this.state.images) && !isEmpty(selected_W_Item) && isEmpty(filteredImages) && !imagesNotFound) {
      var filteredImagesVar;
      filteredImagesVar = images.filter(
        function (filteredImageItem, filteredImageIndex) {
          return filteredImageItem.projectName === selected_W_Item.title;
        }.bind(this)
      );

      // console.log("filtered images", filteredImagesVar);
      if (!isEmpty(filteredImagesVar)) {
        // filteredImagesVar = Object.assign([], filteredImagesVar);
        // console.log(JSON.parse("filtered", JSON.stringify(filteredImagesVar)));
        // console.log("filtered not empty");
        this.setState({ filteredImages: filteredImagesVar[0].images });
      } else this.setState({ imagesNotFound: true });
    }

    if (W_Item_Full_WrapperShadow && !this.state.W_Full_FocusHandled) {
      this.setState({ W_Full_FocusHandled: true });
      // this.W_Item_Full_WrapperRef.current.focus();
    } else if (!W_Item_Full_WrapperShadow && this.state.W_Full_FocusHandled) {
      this.setState({ W_Full_FocusHandled: false });
    }

    if (isEmpty(this.props.location.hash) && W_Item_Full_WrapperShadow && !closeWorkItem) {
      // console.log("hash1");
      // this.setState({ closeWorkItem: true });
    } else if (!isEmpty(this.props.location.hash) && W_Item_Full_WrapperShadow && closeWorkItem) {
      // this.props.history.push("portfolio");
      // console.log("hash2");
      // this.props.history.goBack();
    } else if (!isEmpty(this.props.location.hash) && isEmpty(selected_W_Item)) {
      // console.log("hash3");
      // this.props.history.goBack();
    }

    // if (W_Item_Full_WrapperShadow && !this.state.screenLocked) {
    //     this.setState({ screenLocked: true });
    //     window.screen.orientation.lock("portrait");
    // }
  }

  notifyWorkItemInPosition() {
    this.setState({ workItemInPosition: true });
  }

  setImageSliderClosed() {
    this.setState({ imageSliderClosed: true });
  }

  revealSliderWorkItemsFunc() {
    this.setState({ revealSliderWorkItems: true });
  }

  render() {
    const { isMobileMode, browserName, w_Item_Full_WrapperShadowRedux, w_ContainerIsInPositionShowing } = this.props.styles;
    const {
      itemsSubArray,
      nextItemsSubArray,
      numberOfPages,
      sliderOffsetX,
      sliderOffsetY,
      W_Item_OffsetX,
      W_Item_OffsetY,
      selected_W_Item,
      closeWorkItem,
      closeWorkItemWrapper,
      W_Item_Full_WrapperShadow,
      workItemsTurn,
      currentPage,
      workItemInPosition,
      imageSliderClosed,
      isMiscWorkItem,
      adjustZIndex_behindWave,
      paginatedWorkItems,
    } = this.state;

    return (
      <div
        className={classnames("W_Container", {
          adjustZIndex_InFrontOfWave: w_ContainerIsInPositionShowing,
        })}
      >
        <MyWorks
          readyToLoad={
            // true
            // showWorkItemsContainer
            this.props.styles.loadMyWorksText
          }
          // finishedMyWorksTextAnim={this.finishedMyWorksTextAnim}
          // shutdown={shutdown}
        />

        {(W_Item_OffsetX && W_Item_OffsetY && selected_W_Item) || (selected_W_Item && isMiscWorkItem) ? (
          <div
            ref={this.W_Item_Full_WrapperRef}
            className={classnames("W_Item_Full_Wrapper", {
              W_Item_Full_WrapperShadow: W_Item_Full_WrapperShadow,
              [selected_W_Item.workItemClass]: selected_W_Item.workItemClass,
            })}
            onClick={function (e) {
              this.setState({ closeWorkItem: true });
              this.props.setCursorBtn(false);
            }.bind(this)}
            onTransitionEnd={function (e) {
              if (this.W_Item_Full_WrapperRef.current === e.target && W_Item_Full_WrapperShadow && !w_Item_Full_WrapperShadowRedux) {
                // console.log("redux shadow on");
                this.props.setWI_Full_WrapperShadowRedux(true);
              }

              // if (this.W_Item_Full_WrapperRef.current === e.target) console.log("container shadow");
              // console.log("container shadow", this.W_Item_Full_WrapperRef.current === e.target);
              if (this.W_Item_Full_WrapperRef.current === e.target && W_Item_Full_WrapperShadow === false && closeWorkItem) {
                this.setState(
                  {
                    selected_W_Item: null,
                    W_Item_OffsetX: null,
                    W_Item_OffsetY: null,
                    closeWorkItem: false,
                    closeWorkItemWrapper: false,
                    filteredImages: null,
                    workItemInPosition: false,
                    imagesNotFound: false,
                    isMiscWorkItem: false,
                    // adjustZIndex_ForWorkItem: false
                  },
                  function () {
                    if (this.props.styles.W_ImageSliderClosed) {
                      this.props.setWImageSliderClosed(null);
                    }
                    // console.log("closing slider");

                    // if (!this.props.styles.W_ImageSliderClosed) {
                    //     this.props.setWImageSliderClosed(true);
                    // }

                    if (w_Item_Full_WrapperShadowRedux) {
                      // console.log("redux shadow false");
                      this.props.setWI_Full_WrapperShadowRedux(false);
                    }
                  }.bind(this)
                );
                // console.log("resetting work item");
              }
            }.bind(this)}
            onMouseOver={function () {
              if (!this.props.styles.isCursorOnBtn) this.props.setCursorBtn(true);
              // else if (this.props.styles.isCursorOnBtn) this.props.setCursorBtn(false);
            }.bind(this)}
            // onKeyDown={function (e) {
            //     if (e.keyCode === 27) {
            //         console.log("close");
            //         this.setState({ closeWorkItem: true });
            //         if (this.props.styles.isCursorOnBtn) this.props.setCursorBtn(false);
            //     }
            // }.bind(this)}

            tabIndex={0}
          >
            {!isEmpty(selected_W_Item) &&
            !isMiscWorkItem &&
            w_Item_Full_WrapperShadowRedux &&
            (isMobileMode || browserName !== "chrome") ? (
              <WorkItem_New
                workItem={selected_W_Item}
                workItemClass={selected_W_Item.workItemClass}
                W_Item_OffsetY={W_Item_OffsetY}
                W_Item_OffsetX={W_Item_OffsetX}
                closeWorkItem={closeWorkItem}
                closeWorkItemWrapper={closeWorkItemWrapper}
                closeWorkItemFunc={this.closeWorkItemFunc}
                removeShadow={this.removeShadow}
                notifyWorkItemInPosition={this.notifyWorkItemInPosition}
                imageSliderClosed={imageSliderClosed}
                imagesNotFound={this.state.imagesNotFound}
              />
            ) : !isEmpty(selected_W_Item) && !isMiscWorkItem && !isMobileMode && browserName === "chrome" ? (
              <WorkItem_New
                workItem={selected_W_Item}
                workItemClass={selected_W_Item.workItemClass}
                W_Item_OffsetY={W_Item_OffsetY}
                W_Item_OffsetX={W_Item_OffsetX}
                closeWorkItem={closeWorkItem}
                closeWorkItemWrapper={closeWorkItemWrapper}
                closeWorkItemFunc={this.closeWorkItemFunc}
                removeShadow={this.removeShadow}
                notifyWorkItemInPosition={this.notifyWorkItemInPosition}
                imageSliderClosed={imageSliderClosed}
                imagesNotFound={this.state.imagesNotFound}
              />
            ) : null}

            {
              // !isEmpty(this.state.filteredImages) && (this.props.styles.typeTextAnimState === true || isMiscWorkItem) && w_Item_Full_WrapperShadowRedux
              (!isEmpty(this.state.filteredImages) &&
                w_Item_Full_WrapperShadowRedux &&
                ((this.props.styles.typeTextAnimState === true && this.state.windowWidth >= 900) || this.state.windowWidth < 900)) ||
              isMiscWorkItem ? (
                this.state.windowWidth >= 900 ? (
                  <div className="W_ImageSliderOuterContainer">
                    <W_ImageSlider
                      isMiscWorkItem={isMiscWorkItem}
                      closeWorkItem={closeWorkItem}
                      workItemInPosition={workItemInPosition}
                      images={this.state.filteredImages}
                      removeShadow={this.removeShadow}
                      // setImageSliderClosed
                    />
                  </div>
                ) : (
                  <MobileSlideshowContainer
                    mobileImages={this.state.filteredImages}
                    closeWorkItem={closeWorkItem}
                    removeShadow={this.removeShadow}
                    isMiscWorkItem={isMiscWorkItem}
                    workItemLinkExists={!isEmpty(selected_W_Item.link)}
                  />
                )
              ) : this.state.imagesNotFound || this.props.styles.W_ImageSliderClosed ? null : (
                <div className="W_ImageSlider_SpinnerWrapper">
                  <SpinnerDelayed isLoading={true} />
                </div>
              )
            }
          </div>
        ) : null}

        <PerformanceCube
          pageVisited={this.props.pageVisited}
          revealSliderWorkItemsFunc={this.revealSliderWorkItemsFunc}
          revealSliderWorkItems={this.state.revealSliderWorkItems}
          returnSliderOffsetFunc={this.returnSliderOffsetFunc}
          return_W_Item_Pos={this.return_W_Item_Pos}
          selected_W_Item={selected_W_Item}
          currentPage={currentPage}
          setSliderPage={this.setSliderPage}
          numberOfPages={numberOfPages}
          setMyWorksTextReady={this.props.setMyWorksTextReady}
          paginatedWorkItems={paginatedWorkItems}
          miniWorkItemsStartingPageIndex={this.state.miniWorkItemsStartingPageIndex}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    styles: state.styles,
  };
}

export default withRouter(
  connect(mapStateToProps, { setCursorBtn, setWImageSliderClosed, setMyWorksTextReady, setWI_Full_WrapperShadowRedux })(W_Container)
);
// export default W_Container;
