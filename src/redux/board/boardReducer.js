import {
    GET_BOARD_LIST_SUCCESS,
    CREATE_BOARD_SUCCESS,
    RESET_CREATE_BOARD_STATUS
} from "./boardAction.js";
import {GET_GROUP_INFO_SUCCESS} from "../group/groupAction.js";

const initialState = {
    list: [],
    createSuccess: null,
    createError: null,
};

export const boardReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BOARD_LIST_SUCCESS:
            return { ...state, list: action.payload ?? [] };
        case CREATE_BOARD_SUCCESS:
            return {...state, list: [...state.list, action.payload], createSuccess: action.payload, Error: null};
        case GET_GROUP_INFO_SUCCESS:
            return {...state, info: action.payload};
        case RESET_CREATE_BOARD_STATUS:
            return {...state, createSuccess: null, createError: null,};
        default:
            return state;
    }
}
