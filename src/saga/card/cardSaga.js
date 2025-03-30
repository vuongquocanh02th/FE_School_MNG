import {call, put, takeLatest} from "redux-saga/effects";
import {
    ADD_CARD_REQUEST,
    fetchCardsSuccess,
    FETCH_CARDS_REQUEST, MOVE_CARD_REQUEST,
    GET_CARDS,
    GET_CARDS_SUCCESS,
    GET_CARDS_FAILURE,
    GET_CARD_DETAIL,
    GET_CARD_DETAIL_SUCCESS,
    GET_CARD_DETAIL_FAILURE
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
        yield put({ type: GET_CARDS_SUCCESS, payload: response });
    } catch (error) {
        yield put({ type: GET_CARDS_FAILURE, payload: error.message });
    }
}

function* handleGetCardDetail(action) {
    try {
        const response = yield call(axiosInstance.get, `/api/cards/${action.payload}`);

        const cardData = response?.data || response;
        if (!cardData || Object.keys(cardData).length === 0) {
            yield put({ type: GET_CARD_DETAIL_FAILURE, payload: "Không tìm thấy card!" });
            return;
        }
        yield put({ type: GET_CARD_DETAIL_SUCCESS, payload: cardData });
    } catch (error) {
        console.error("❌ API error:", error.response?.data || error.message);
        yield put({ type: GET_CARD_DETAIL_FAILURE, payload: "Lỗi khi tải thông tin card!" });
    }
}

export default function* cardSaga() {
    yield takeLatest(FETCH_CARDS_REQUEST, fetchCardsSaga);
    yield takeLatest(ADD_CARD_REQUEST, addCardSaga);
    yield takeLatest(MOVE_CARD_REQUEST, moveCard);
    yield takeLatest(GET_CARDS, handleGetCards);
    yield takeLatest(GET_CARD_DETAIL, handleGetCardDetail);
}
