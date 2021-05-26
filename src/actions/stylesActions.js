import {
  SET_OPENER_SCREEN_DONE,
  SET_PORTFOLIO_READY,
  SET_PORTFOLIO_DESTROY_WELCOME,
  SET_BG_IMG_LOADED,
  SET_PAGE_GRADIENT,
  SET_PAGE_VISITED,
  SET_CURSOR_BTN,
  SET_TYPE_TEXT_ANIM_FINISHED,
  SET_W_IMAGE_SLIDER_CLOSED,
  SET_SHOW_MIRROR_SLIDESHOW,
  SET_SHOW_MISC_WORKITEM_SLIDESHOW,
  SET_WORK_ITEM_OPEN,
  SET_MISC_WORK_ITEM_OPEN,
  SET_IS_TOUCH_SCREEN,
  SET_TOUCH_RECT_REVEALED,
  SET_HIDE_PULLNAVBTN,
  SET_MYWORKS_READY,
  SET_MOBILE_MODE,
  SET_BROWSER_NAME,
  SET_WI_IMAGE_LOADED,
  SET_WI_FULL_WRAPPER_SHADOW,
  MISC_WI_SHADOW,
  SET_W_CONTAINER_IN_POSITION_SHOWING,
  SET_FINGER_POINTER_MB_DISMISSED,
  STARS_SHOWING,
  DOCUMENT_HAS_FOCUS,
} from "./types";

export const setOpenerScreenDone = function (status) {
  return function (dispatch) {
    dispatch({
      type: SET_OPENER_SCREEN_DONE,
      payload: status,
    });
  };
};

export const setPortfolioReady = function (status) {
  return function (dispatch) {
    dispatch({
      type: SET_PORTFOLIO_READY,
      payload: status,
    });
  };
};

export const setPortfolioDestroyWelcome = function (status) {
  return function (dispatch) {
    dispatch({
      type: SET_PORTFOLIO_DESTROY_WELCOME,
      payload: status,
    });
  };
};

export const setBgImgLoaded = function (status) {
  return function (dispatch) {
    dispatch({
      type: SET_BG_IMG_LOADED,
      payload: status,
    });
  };
};

export const setPageGradient = function (page) {
  return function (dispatch) {
    dispatch({
      type: SET_PAGE_GRADIENT,
      payload: page,
    });
  };
};

export const setPageVisited = function (page) {
  return function (dispatch) {
    dispatch({
      type: SET_PAGE_VISITED,
      payload: page,
    });
  };
};

export const setCursorBtn = function (page) {
  return function (dispatch) {
    dispatch({
      type: SET_CURSOR_BTN,
      payload: page,
    });
  };
};

export const setTypeAnimatedTextAnimState = function (state) {
  return function (dispatch) {
    dispatch({
      type: SET_TYPE_TEXT_ANIM_FINISHED,
      payload: state, // true = finished loading, false = finished unloading
    });
  };
};

export const setWImageSliderClosed = function (state) {
  return function (dispatch) {
    dispatch({
      type: SET_W_IMAGE_SLIDER_CLOSED,
      payload: state,
    });
  };
};

export const showMirrorSlideshow = function (show) {
  return function (dispatch) {
    dispatch({
      type: SET_SHOW_MIRROR_SLIDESHOW,
      payload: show,
    });
  };
};

export const showMiscWorkItemSlideshow = function (show) {
  return function (dispatch) {
    dispatch({
      type: SET_SHOW_MISC_WORKITEM_SLIDESHOW,
      payload: show,
    });
  };
};

export const setWorkItemOpen = function (isOpen) {
  return function (dispatch) {
    dispatch({
      type: SET_WORK_ITEM_OPEN,
      payload: isOpen,
    });
  };
};

export const setMiscWorkItemOpen = function (isOpen) {
  return function (dispatch) {
    dispatch({
      type: SET_MISC_WORK_ITEM_OPEN,
      payload: isOpen,
    });
  };
};

export const setIsTouchScreen = function (isTouchScreen) {
  return function (dispatch) {
    dispatch({
      type: SET_IS_TOUCH_SCREEN,
      payload: isTouchScreen,
    });
  };
};

// Notifies the app that rectangle/stair with the word "touch" was revelead, so the contact form may subsequently show.
export const setTouchRectangleRevealed = function (isRevealed) {
  return function (dispatch) {
    dispatch({
      type: SET_TOUCH_RECT_REVEALED,
      payload: isRevealed,
    });
  };
};

export const setPullNavBtnContainerHidden = function (isHidden) {
  return function (dispatch) {
    dispatch({
      type: SET_HIDE_PULLNAVBTN,
      payload: isHidden,
    });
  };
};

export const setMyWorksTextReady = function (isReady) {
  return function (dispatch) {
    dispatch({
      type: SET_MYWORKS_READY,
      payload: isReady,
    });
  };
};

export const setMobileMode = function (isMobile) {
  return function (dispatch) {
    dispatch({
      type: SET_MOBILE_MODE,
      payload: isMobile,
    });
  };
};

export const setBrowserName = function (browserName) {
  return function (dispatch) {
    dispatch({
      type: SET_BROWSER_NAME,
      payload: browserName,
    });
  };
};

export const setWI_Full_WrapperShadowRedux = function (isShadowShowing) {
  return function (dispatch) {
    dispatch({
      type: SET_WI_FULL_WRAPPER_SHADOW,
      payload: isShadowShowing,
    });
  };
};

export const setMiscWIShadowRedux = function (isShadowShowing) {
  return function (dispatch) {
    dispatch({
      type: MISC_WI_SHADOW,
      payload: isShadowShowing,
    });
  };
};

export const setW_ContainerInPositionShowing = function (inPositionShowing) {
  return function (dispatch) {
    dispatch({
      type: SET_W_CONTAINER_IN_POSITION_SHOWING,
      payload: inPositionShowing,
    });
  };
};

// Start of work item components load sequence

export const setWIImageLoaded = function (isImageLoaded) {
  return function (dispatch) {
    dispatch({
      type: SET_WI_IMAGE_LOADED,
      payload: isImageLoaded,
    });
  };
};

// End of work item components load sequence

export const setFingerPointerMotionBlurDismissed = function (isDismissed) {
  return function (dispatch) {
    dispatch({
      type: SET_FINGER_POINTER_MB_DISMISSED,
      payload: isDismissed,
    });
  };
};

export const setStarsShowing = function () {
  return function (dispatch) {
    dispatch({
      type: STARS_SHOWING,
      payload: true,
    });
  };
};

export const setDocumentHasFocus = function (hasFocus) {
  return function (dispatch) {
    dispatch({
      type: DOCUMENT_HAS_FOCUS,
      payload: hasFocus,
    });
  };
};
