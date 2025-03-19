import {GET_BOARD_LIST, GET_BOARD_LIST_SUCCESS, SET_ALL_BOARDS} from "./boardAction.js";
import {GET_GROUP_INFO_SUCCESS} from "../group/groupAction.js";

const initialState = {
    list: [],
    info: {},
    allBoards: [], //them trang thai luu tat ca bang
}

export const boardReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BOARD_LIST_SUCCESS:
            return {...state, list: action.payload};
        case GET_GROUP_INFO_SUCCESS:
            return {...state, info: action.payload};
        case SET_ALL_BOARDS:
            return { ...state, allBoards: Array.isArray(action.payload) ? action.payload : [] };
        case GET_BOARD_LIST:
            return { ...state, list: [] };
        default:
            return state;
    }
}