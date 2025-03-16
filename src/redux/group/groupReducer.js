import {GET_GROUP_LIST_SUCCESS, GET_GROUP_INFO_SUCCESS} from "./groupAction.js";

const initialState = {
    list: [],
    info: {}
}

export const groupReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_GROUP_LIST_SUCCESS:
            return {...state, list: action.payload};
        case GET_GROUP_INFO_SUCCESS:
            return {...state, info: action.payload};
        default:
            return state;
    }
}