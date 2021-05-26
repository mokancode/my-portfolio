import {
  SET_OPENER_SCREEN_DONE,
  SET_PORTFOLIO_WELCOME_DONE,
  SET_PORTFOLIO_DESTROY_WELCOME,
  SET_PORTFOLIO_READY,
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
} from "../actions/types";
import isEmpty from "../validation/is-empty";

const initialState = {
  openerScreenDone: false,
  portfolioReadyToLoad: false,
  portfolioDestroyWelcome: false,
  pageGradient: "landing",
  bgImgLoaded: false,
  visitedPages: [],
  isCursorOnBtn: false,
  typeTextAnimState: null,
  W_ImageSliderClosed: null,
  showMirrorSlideshow: false,
  showMiscWorkItemSlideshow: false,
  isWorkItemOpen: false,
  isMiscWorkItemOpen: false,
  isTouchScreen: null,
  rectangleTouchTextIsRevealed: false,
  pullNavBtnContainerHidden: false,
  loadMyWorksText: false,
  isMobileMode: null,
  browserName: null,
  w_Item_Full_WrapperShadowRedux: false,
  miscWorkItemShadowRedux: false,
  w_ContainerIsInPositionShowing: false,
  isFingerPointerMotionBlurDismissed: false,
  // Start of work item components load sequence:
  isWIImageLoaded: false,
  // End of work item components load sequence.
  starsShowing: false,
  documentHasFocus: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_OPENER_SCREEN_DONE:
      return {
        ...state,
        openerScreenDone: action.payload,
      };

    case SET_PORTFOLIO_DESTROY_WELCOME:
      return {
        ...state,
        portfolioDestroyWelcome: action.payload,
      };

    case SET_PORTFOLIO_READY:
      return {
        ...state,
        portfolioReadyToLoad: action.payload,
      };

    case SET_BG_IMG_LOADED:
      return {
        ...state,
        bgImgLoaded: action.payload,
      };

    case SET_PAGE_GRADIENT:
      return {
        ...state,
        pageGradient: action.payload,
      };

    case SET_PAGE_VISITED:
      return {
        ...state,
        visitedPages: action.payload,
      };
    case SET_CURSOR_BTN:
      return {
        ...state,
        isCursorOnBtn: action.payload,
      };
    case SET_TYPE_TEXT_ANIM_FINISHED:
      return {
        ...state,
        typeTextAnimState: action.payload,
      };
    case SET_W_IMAGE_SLIDER_CLOSED:
      return {
        ...state,
        W_ImageSliderClosed: action.payload,
      };
    case SET_SHOW_MIRROR_SLIDESHOW:
      return {
        ...state,
        showMirrorSlideshow: action.payload,
      };
    case SET_SHOW_MISC_WORKITEM_SLIDESHOW:
      return {
        ...state,
        showMiscWorkItemSlideshow: action.payload,
      };
    case SET_WORK_ITEM_OPEN:
      return {
        ...state,
        isWorkItemOpen: action.payload,
      };
    case SET_MISC_WORK_ITEM_OPEN:
      return {
        ...state,
        isMiscWorkItemOpen: action.payload,
      };
    case SET_IS_TOUCH_SCREEN:
      return {
        ...state,
        isTouchScreen: action.payload,
      };
    case SET_TOUCH_RECT_REVEALED:
      return {
        ...state,
        rectangleTouchTextIsRevealed: action.payload,
      };
    case SET_HIDE_PULLNAVBTN:
      return {
        ...state,
        pullNavBtnContainerHidden: action.payload,
      };
    case SET_MYWORKS_READY:
      return {
        ...state,
        loadMyWorksText: action.payload,
      };
    case SET_MOBILE_MODE:
      return {
        ...state,
        isMobileMode: action.payload,
      };
    case SET_BROWSER_NAME:
      return {
        ...state,
        browserName: action.payload,
      };
    case SET_WI_FULL_WRAPPER_SHADOW:
      return {
        ...state,
        w_Item_Full_WrapperShadowRedux: action.payload,
      };
    case MISC_WI_SHADOW:
      return {
        ...state,
        miscWorkItemShadowRedux: action.payload,
      };
    case SET_W_CONTAINER_IN_POSITION_SHOWING:
      return {
        ...state,
        w_ContainerIsInPositionShowing: action.payload,
      };

    // Start of work item components load sequence
    case SET_WI_IMAGE_LOADED:
      return {
        ...state,
        isWIImageLoaded: action.payload,
      };
    // End of work item components load sequence

    case SET_FINGER_POINTER_MB_DISMISSED:
      return {
        ...state,
        isFingerPointerMotionBlurDismissed: action.payload,
      };

    case STARS_SHOWING:
      return {
        ...state,
        starsShowing: true,
      };
    case DOCUMENT_HAS_FOCUS:
      return {
        ...state,
        documentHasFocus: action.payload,
      };

    default:
      return state;
  }
}
