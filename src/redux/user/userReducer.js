import {
    GET_USER_DETAIL,
    GET_USER_DETAIL_SUCCESS,
    GET_USER_DETAIL_FAIL,
    RESET_USER_DETAIL,
    UPDATE_USER,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
} from './UserAction';

const initialState = {
    detail: null,
    error: null,
    updateError: null,
    updateSuccess: false,
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_DETAIL:
            return { ...state, error: null };
        case GET_USER_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                detail: action.payload,
                error: null,
            };

        case GET_USER_DETAIL_FAIL:
            return { ...state, error: action.payload };
        case RESET_USER_DETAIL:
            return { ...state, detail: null, error: null, updateSuccess: false };

        case UPDATE_USER:
            return { ...state, updateError: null, updateSuccess: false };
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                detail: action.payload,
                updateSuccess: true
            };
        case UPDATE_USER_FAIL:
            return { ...state, updateError: action.payload };

        default:
            return state;
    }
};
