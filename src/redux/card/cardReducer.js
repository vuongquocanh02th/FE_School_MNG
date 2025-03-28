import {
    GET_CARDS,
    GET_CARDS_SUCCESS,
    GET_CARDS_FAILURE,
    GET_CARD_DETAIL_SUCCESS,
    GET_CARD_DETAIL_FAILURE,
    CLEAR_CARD_DETAIL,
    CLEAR_ERROR,

} from './cardAction.js';

const initialState = {
    list: [],
    loading: false,
    error: null,
    detail: null,
};

export const cardReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CARDS:
            return { ...state, loading: true, error: null };
        case GET_CARDS_SUCCESS:
            return { ...state, list: action.payload, loading: false };
        case GET_CARDS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case GET_CARD_DETAIL_SUCCESS:
            return { ...state, detail: action.payload, loading: false };
        case GET_CARD_DETAIL_FAILURE:
            return { ...state, error: action.payload, loading: false };
        case CLEAR_CARD_DETAIL:
            return { ...state, detail: null };
        case CLEAR_ERROR:
            return { ...state, error: null };
        default:
            return state;
    }
};

