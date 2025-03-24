export const ADD_CARD_REQUEST = "ADD_CARD_REQUEST";
export const ADD_CARD_SUCCESS = "ADD_CARD_SUCCESS";
export const ADD_CARD_FAILURE = "ADD_CARD_FAILURE";

export const FETCH_CARDS_REQUEST = "FETCH_CARDS_REQUEST";
export const FETCH_CARDS_SUCCESS = "FETCH_CARDS_SUCCESS";
export const FETCH_CARDS_FAILURE = "FETCH_CARDS_FAILURE";

// Action để lấy danh sách card từ API
export const fetchCards = (listId) => ({
    type: FETCH_CARDS_REQUEST,
    payload: listId, // 🔥 Truyền listId vào payload
});

export const fetchCardsSuccess = (listId, cards) => ({
    type: FETCH_CARDS_SUCCESS,
    payload: { listId, cards }, // 🔥 Giữ listId trong payload
});

export const fetchCardsFailure = (error) => ({
    type: FETCH_CARDS_FAILURE,
    payload: error,
});

// Action để thêm card mới
export const addCard = (cardData) => ({
    type: ADD_CARD_REQUEST,
    payload: cardData, // 🔥 cardData phải chứa listId
});

export const addCardSuccess = (listId, card) => ({
    type: ADD_CARD_SUCCESS,
    payload: { listId, card }, // 🔥 Giữ listId trong payload
});

export const addCardFailure = (error) => ({
    type: ADD_CARD_FAILURE,
    payload: error,
});
