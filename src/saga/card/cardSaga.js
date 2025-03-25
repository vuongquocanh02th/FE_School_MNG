import { call, put, takeLatest } from "redux-saga/effects";
import {
    addCardSuccess,
    addCardFailure,
    ADD_CARD_REQUEST,
    fetchCardsSuccess,
    fetchCardsFailure,
    FETCH_CARDS_REQUEST,
} from "../../redux/card/cardAction.js";
import axiosInstance from "../../resources/axiosConfig.js"; // 🔥 Import Axios Instance

function* fetchCardsSaga(action) {
    try {
        const response = yield call(axiosInstance.get, `/api/lists/${action.payload}/cards`);
        yield put(fetchCardsSuccess(action.payload, response)); // Thêm payload.listId vào trong action
    } catch (error) {
        yield put(fetchCardsFailure(error.message));
    }
}


function* addCardSaga(action) {
    try {
        const response = yield call(axiosInstance.post, "/api/cards", action.payload);
        yield put(addCardSuccess(response.data));
    } catch (error) {
        yield put(addCardFailure(error.message));
    }
}

export default function* cardSaga() {
    yield takeLatest(FETCH_CARDS_REQUEST, fetchCardsSaga);
    yield takeLatest(ADD_CARD_REQUEST, addCardSaga);
}
