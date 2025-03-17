import {
    GET_GROUP_LIST_SUCCESS,
    GET_GROUP_INFO_SUCCESS,
    ADD_GROUP_SUCCESS,
    OPEN_ADD_GROUP_FORM,
    OPEN_EDIT_GROUP_FORM, CLOSE_GROUP_FORM
} from "./groupAction.js";

const initialState = {
    list: [],
    info: {},
    successChange: {},
    formType: "none"
}

export const groupReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_GROUP_LIST_SUCCESS:
            return {...state, list: action.payload};
        case GET_GROUP_INFO_SUCCESS:
            return {...state, info: action.payload};
        case ADD_GROUP_SUCCESS:
            return {...state, successChange: action.payload};
        case OPEN_ADD_GROUP_FORM:
            return {...state, formType: "add"};
        case OPEN_EDIT_GROUP_FORM:
            return {...state, formType: "edit"};
        case CLOSE_GROUP_FORM:
            return {...state, formType: "none"};
        default:
            return state;
    }
}