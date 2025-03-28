import {
    GET_BOARD_LIST_SUCCESS,
    CREATE_BOARD_SUCCESS,
    RESET_CREATE_BOARD_STATUS,
    GET_BOARD_LIST,
    SET_ALL_BOARDS,
    UPDATE_BOARD_SUCCESS,
    GET_BOARD_DETAIL,
    GET_BOARD_DETAIL_SUCCESS,
} from "./boardAction.js";
import {GET_GROUP_INFO_SUCCESS} from "../group/groupAction.js";

const initialState = {
    list: [],
    createSuccess: null,
    createError: null,
    info: {},
    allBoards: [],
};

export const boardReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BOARD_LIST_SUCCESS:
            return {...state, list: Array.isArray(action.payload) ? action.payload : [action.payload].filter(Boolean)};
        case CREATE_BOARD_SUCCESS:
            return {...state, list: [...state.list, action.payload], createSuccess: action.payload, Error: null};
        case GET_GROUP_INFO_SUCCESS:
            return {...state, info: action.payload};
        case SET_ALL_BOARDS:
            return {...state, allBoards: Array.isArray(action.payload) ? action.payload : []};
        case RESET_CREATE_BOARD_STATUS:
            return {...state, createSuccess: null, createError: null,};
        case GET_BOARD_LIST:
            return {...state, list: []};
        case UPDATE_BOARD_SUCCESS:
            return {
                ...state,
                list: state.list.map(board =>
                    board.id === action.payload.id ? action.payload : board
                ),
                info: state.info.id === action.payload.id ? action.payload : state.info
            };
        case GET_BOARD_DETAIL_SUCCESS:
            return {...state, info: action.payload};
        case GET_BOARD_DETAIL:
            return { ...state, error: null };
        default:
            return state;
    }
}