import { call, put, takeLatest } from 'redux-saga/effects';
import {
    GET_CARDS,
    GET_CARDS_SUCCESS,
    GET_CARDS_FAILURE,
    GET_CARD_DETAIL,
    GET_CARD_DETAIL_SUCCESS,
    GET_CARD_DETAIL_FAILURE,
} from '../../redux/card/cardAction.js';
import axiosInstance from "../../resources/axiosConfig.js";

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

        // 🛠 Cập nhật cách lấy dữ liệu
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
    yield takeLatest(GET_CARDS, handleGetCards);
    yield takeLatest(GET_CARD_DETAIL, handleGetCardDetail);
}
