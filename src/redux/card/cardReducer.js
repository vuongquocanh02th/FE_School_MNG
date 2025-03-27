import {
    ADD_CARD_REQUEST, ADD_CARD_SUCCESS, ADD_CARD_FAILURE,
    FETCH_CARDS_REQUEST, FETCH_CARDS_SUCCESS, FETCH_CARDS_FAILURE
} from "./cardAction.js";

const initialState = {
    cardsByList: {},
    loading: false,
    error: null,
    success: null
};

export const cardReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CARDS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_CARDS_SUCCESS:
            return {
                ...state,
                loading: false,
                cardsByList: {
                    ...state.cardsByList,
                    [action.payload.listId]: action.payload.cards.sort((a, b) => a.priority - b.priority)
                },
            };
        case FETCH_CARDS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case ADD_CARD_REQUEST:
            return {
                ...state,
                loading: true
            };
        case ADD_CARD_SUCCESS:
            return {
                ...state,
                loading: false
            };
        case ADD_CARD_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};
