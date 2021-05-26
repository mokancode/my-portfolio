import { SET_LOADING_SCREEN, SET_CURRENT_PAGE } from './types';

export const setLoadingScreen = function (status) {
    return function (dispatch) {
        dispatch({
            type: SET_LOADING_SCREEN,
            payload: status
        })
    }
}

export const setCurrentPage = function (page) {
    return function (dispatch) {
        dispatch({
            type: SET_CURRENT_PAGE,
            payload: page
        })
    }
}