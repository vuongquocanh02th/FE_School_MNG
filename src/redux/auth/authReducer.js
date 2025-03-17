import {AUTH_RESET, LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT, REGISTER_ERROR, REGISTER_SUCCESS} from "./authAction.js";

const initialState = {
    user: {},
    success: null,
    error: null
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {...state, user: action.payload};
        case REGISTER_SUCCESS:
            return {...state, success: action.payload};
        case LOGIN_ERROR:
        case REGISTER_ERROR:
            return {...state, error: action.payload};
        case AUTH_RESET:
            return {...state, success: null, error: null}
        case LOGOUT:
            return {...state, user:{}}
        default:
            return state;
    }
}