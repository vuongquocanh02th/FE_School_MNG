import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
    FETCH_LISTS_REQUEST,
    FETCH_LISTS_SUCCESS,
    FETCH_LISTS_FAILURE,
    ADD_LIST_REQUEST,
    ADD_LIST_SUCCESS,
    ADD_LIST_FAILURE,
    UPDATE_LIST_REQUEST,
    UPDATE_LIST_SUCCESS,
    UPDATE_LIST_FAILURE,
} from "../../redux/list/listAction.js";

const API_URL = "http://localhost:8080/api/lists";

function* fetchListsSaga(action) {
    try {
        console.log("📡 Fetching lists for Board ID:", action.payload);
        const response = yield call(axios.get, `${API_URL}/board/${action.payload}`);
        console.log("✅ Danh sách lists:", response.data);
        yield put({ type: FETCH_LISTS_SUCCESS, payload: response.data });
    } catch (error) {
        console.error("❌ FETCH_LISTS_FAILURE:", error.response?.data?.message || error.message);
        yield put({ type: FETCH_LISTS_FAILURE, payload: error.response?.data?.message || error.message });
    }
}


function* addListSaga(action) {
    try {
        console.log("🚀 Saga nhận action ADD_LIST_REQUEST với payload:", action.payload);
        const response = yield call(axios.post, API_URL, action.payload, {
            headers: { "Content-Type": "application/json" },
        });
        console.log("✅ API response:", response.data);
        yield put({ type: ADD_LIST_SUCCESS, payload: response.data });
    } catch (error) {
        console.error("❌ ADD_LIST_FAILURE:", error);
        yield put({ type: ADD_LIST_FAILURE, payload: error.message });
    }
}

function* updateListSaga(action) {
    try {
        const response = yield call(axios.put, `${API_URL}/${action.payload.id}`, action.payload);
        yield put({ type: UPDATE_LIST_SUCCESS, payload: response.data });
    } catch (error) {
        yield put({ type: UPDATE_LIST_FAILURE, payload: error.message });
    }
}

export function* listSaga() {
    yield takeLatest(FETCH_LISTS_REQUEST, fetchListsSaga);
    yield takeLatest(ADD_LIST_REQUEST, addListSaga);
    yield takeLatest(UPDATE_LIST_REQUEST, updateListSaga);
}
