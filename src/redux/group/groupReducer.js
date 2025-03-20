import {
    GET_GROUP_LIST_SUCCESS,
    GET_GROUP_INFO_SUCCESS,
    ADD_GROUP_SUCCESS,
    OPEN_ADD_GROUP_FORM,
    OPEN_EDIT_GROUP_FORM, RESET_GROUP, DELETE_GROUP_SUCCESS, EDIT_GROUP_SUCCESS
} from "./groupAction.js";

const initialState = {
    list: [],
    info: {},
    success: "",
    error: {},
    formType: "none"
}

export const groupReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_GROUP_LIST_SUCCESS:
            return {...state, list: action.payload};
        case GET_GROUP_INFO_SUCCESS:
            return {...state, info: action.payload};
        case ADD_GROUP_SUCCESS:
            return {...state, success: "add"};
        case EDIT_GROUP_SUCCESS:
            return {...state, success: "edit"};
        case DELETE_GROUP_SUCCESS:
            return {...state, success: "delete"};
        case OPEN_ADD_GROUP_FORM:
            return {...state, formType: "add"};
        case OPEN_EDIT_GROUP_FORM:
            return {...state, formType: "edit"};
        case RESET_GROUP:
            return {...state, formType: "none", success: "", error: ""};
        default:
            return state;
    }
}