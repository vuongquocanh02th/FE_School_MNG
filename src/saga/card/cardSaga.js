import {call, put, takeLatest} from "redux-saga/effects";
import {
    ADD_CARD_REQUEST,
    fetchCardsSuccess,
    FETCH_CARDS_REQUEST, MOVE_CARD_REQUEST,
} from "../../redux/card/cardAction.js";
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

export default function* cardSaga() {
    yield takeLatest(FETCH_CARDS_REQUEST, fetchCardsSaga);
    yield takeLatest(ADD_CARD_REQUEST, addCardSaga);
    yield takeLatest(MOVE_CARD_REQUEST, moveCard);
}
