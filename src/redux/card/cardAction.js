export const ADD_CARD_REQUEST = "ADD_CARD_REQUEST";
export const ADD_CARD_SUCCESS = "ADD_CARD_SUCCESS";
export const ADD_CARD_FAILURE = "ADD_CARD_FAILURE";

export const FETCH_CARDS_REQUEST = "FETCH_CARDS_REQUEST";
export const FETCH_CARDS_SUCCESS = "FETCH_CARDS_SUCCESS";
export const FETCH_CARDS_FAILURE = "FETCH_CARDS_FAILURE";

export const MOVE_CARD_REQUEST = "MOVE_CARD_REQUEST";

export const GET_CARDS = 'GET_CARDS';
export const GET_CARDS_SUCCESS = 'GET_CARDS_SUCCESS';
export const GET_CARDS_FAILURE = 'GET_CARDS_FAILURE';

export const GET_CARD_DETAIL = 'GET_CARD_DETAIL';
export const GET_CARD_DETAIL_SUCCESS = 'GET_CARD_DETAIL_SUCCESS';
export const GET_CARD_DETAIL_FAILURE = 'GET_CARD_DETAIL_FAILURE';

export const CLEAR_ERROR = 'CLEAR_ERROR';
export const CLEAR_CARD_DETAIL = 'CLEAR_CARD_DETAIL';

export const UPDATE_CARD_DETAIL = 'UPDATE_CARD';
export const UPDATE_CARD_DETAIL_SUCCESS = 'UPDATE_CARD_SUCCESS';
export const UPDATE_CARD_DETAIL_FAILURE = 'UPDATE_CARD_FAILURE';

export const fetchCards = (listId) => ({
    type: FETCH_CARDS_REQUEST,
    payload: listId
});

export const fetchCardsSuccess = (listId, cards) => ({
    type: FETCH_CARDS_SUCCESS,
    payload: { listId, cards }
});

export const fetchCardsFailure = (error) => ({
    type: FETCH_CARDS_FAILURE,
    payload: error,
});

// Action để thêm card mới
export const addCard = (cardData) => ({
    type: ADD_CARD_REQUEST,
    payload: cardData
});

export const addCardSuccess = (listId, card) => ({
    type: ADD_CARD_SUCCESS,
    payload: { listId, card }
});

export const addCardFailure = (error) => ({
    type: ADD_CARD_FAILURE,
    payload: error,
});
