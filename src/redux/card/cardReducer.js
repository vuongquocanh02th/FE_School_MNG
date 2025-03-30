import {
    ADD_CARD_REQUEST,
    ADD_CARD_SUCCESS,
    ADD_CARD_FAILURE,
    FETCH_CARDS_REQUEST,
    FETCH_CARDS_SUCCESS,
    FETCH_CARDS_FAILURE,
    GET_CARDS,
    GET_CARDS_SUCCESS,
    GET_CARDS_FAILURE,
    GET_CARD_DETAIL_SUCCESS,
    GET_CARD_DETAIL_FAILURE,
    CLEAR_CARD_DETAIL,
    CLEAR_ERROR,

} from './cardAction.js';

const initialState = {
    cardsByList: {}, list: [], loading: false, error: null, success: null, detail: null
};

export const cardReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CARDS_REQUEST:
            return {
                ...state, loading: true, error: null
            };
        case FETCH_CARDS_SUCCESS:
            return {
                ...state, loading: false, cardsByList: {
                    ...state.cardsByList,
                    [action.payload.listId]: action.payload.cards.sort((a, b) => a.priority - b.priority)
                },
            };
        case FETCH_CARDS_FAILURE:
            return {
                ...state, loading: false, error: action.payload
            };
        case ADD_CARD_REQUEST:
            return {
                ...state, loading: true
            };
        case ADD_CARD_SUCCESS:
            return {
                ...state, loading: false
            };
        case ADD_CARD_FAILURE:
            return {
                ...state, loading: false, error: action.payload
            };
        case GET_CARDS:
            return {...state, loading: true, error: null};
        case GET_CARDS_SUCCESS:
            return {...state, list: action.payload, loading: false};
        case GET_CARDS_FAILURE:
            return {...state, loading: false, error: action.payload};
        case GET_CARD_DETAIL_SUCCESS:
            return {...state, detail: action.payload, loading: false};
        case GET_CARD_DETAIL_FAILURE:
            return {...state, error: action.payload, loading: false};
        case CLEAR_CARD_DETAIL:
            return {...state, detail: null};
        case CLEAR_ERROR:
            return {...state, error: null};
        default:
            return state;
    }
};