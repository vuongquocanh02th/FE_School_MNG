import {call, put, takeLatest} from "redux-saga/effects";
import {
    ADD_CARD_REQUEST,
    FETCH_CARDS_REQUEST,
    fetchCardsSuccess,
    GET_CARD_DETAIL,
    GET_CARD_DETAIL_FAILURE,
    GET_CARD_DETAIL_SUCCESS,
    GET_CARDS,
    GET_CARDS_FAILURE,
    GET_CARDS_SUCCESS,
    MOVE_CARD_REQUEST, UPDATE_CARD_DETAIL
} from '../../redux/card/cardAction.js';
import axiosInstance from "../../resources/axiosConfig.js";
import {FETCH_LISTS_REQUEST} from "../../redux/list/listAction.js";

function* fetchCardsSaga(action) {
    try {
        const response = yield call(axiosInstance.get, `/api/cards/${action.payload}`);
        yield put(fetchCardsSuccess(action.payload, response));
    } catch (error) {
        console.error(error);
    }
}


function* addCardSaga(action) {
    try {
        yield call(axiosInstance.post, `/api/cards`, action.payload.card);
        yield put({type: FETCH_LISTS_REQUEST, payload: action.payload.board_id});
    } catch (error) {
        console.error(error);
    }
}

function* moveCard(action) {
    try {
        yield call(axiosInstance.put, `/api/cards/${action.payload.listId}/move`, action.payload.card);
        yield put({type: FETCH_LISTS_REQUEST, payload: action.payload.board_id});
    } catch (error) {
        console.error(error);
    }
}

function* handleGetCards() {
    try {
        const response = yield call(axiosInstance.get, "/api/cards");
        yield put({type: GET_CARDS_SUCCESS, payload: response});
    } catch (error) {
        yield put({type: GET_CARDS_FAILURE, payload: error.message});
    }
}

function* handleGetCardDetail(action) {
    try {
        const response = yield call(axiosInstance.get, `/api/cards/details/${action.payload}`);
        // if (!cardData || Object.keys(cardData).length === 0) {
        //     yield put({type: GET_CARD_DETAIL_FAILURE, payload: "Không tìm thấy card!"});
        //     return;
        // }
        yield put({type: GET_CARD_DETAIL_SUCCESS, payload: response});
    } catch (error) {
        console.error("❌ API error:", error.response?.data || error.message);
        yield put({type: GET_CARD_DETAIL_FAILURE, payload: "Lỗi khi tải thông tin card!"});
    }
}

function* handleUpdateCard(action) {
    try {
        yield call(axiosInstance.put, `/api/cards/${action.payload.cardId}`, action.payload.data);
        yield put({type: FETCH_LISTS_REQUEST, payload: action.payload.boardId});
        yield put({type: GET_CARD_DETAIL, payload: action.payload.cardId});
    } catch (error) {
        console.error(error);
    }
}

export default function* cardSaga() {
    yield takeLatest(FETCH_CARDS_REQUEST, fetchCardsSaga);
    yield takeLatest(ADD_CARD_REQUEST, addCardSaga);
    yield takeLatest(MOVE_CARD_REQUEST, moveCard);
    yield takeLatest(GET_CARDS, handleGetCards);
    yield takeLatest(GET_CARD_DETAIL, handleGetCardDetail);
    yield takeLatest(UPDATE_CARD_DETAIL, handleUpdateCard);
}
