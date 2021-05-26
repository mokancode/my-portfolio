import { SET_LOADING_SCREEN, SET_CURRENT_PAGE } from '../actions/types';

const initialState = {
    loadingScreenShowing: false,
    currentPage: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_LOADING_SCREEN:
            return {
                ...state,
                loadingScreenShowing: action.payload
            }

        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }

        default:
            return state;
    }
}