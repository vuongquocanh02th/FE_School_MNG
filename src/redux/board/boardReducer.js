import {GET_BOARD_LIST_SUCCESS} from "./boardAction.js";
import {GET_GROUP_INFO_SUCCESS} from "../group/groupAction.js";

const initialState = {
    list: [],
    info: {}
}

export const boardReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BOARD_LIST_SUCCESS:
            return {...state, list: action.payload};
        case GET_GROUP_INFO_SUCCESS:
            return {...state, info: action.payload};
        default:
            return state;
    }
}