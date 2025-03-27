import {call, put, takeLatest} from "redux-saga/effects";
import {
    FETCH_LISTS_REQUEST,
    FETCH_LISTS_SUCCESS,
    ADD_LIST_REQUEST,
    UPDATE_LIST_REQUEST,
    MOVE_LIST,
} from "../../redux/list/listAction.js";
import axiosInstance from "../../resources/axiosConfig.js";

function* fetchListsSaga(action) {
    try {
        const response = yield call(axiosInstance.get, `/api/lists/${action.payload}`);
        for (const list of response) {
            list.cards = list.cards.sort((a, b) => a.priority - b.priority);
        }
        yield put({type: FETCH_LISTS_SUCCESS, payload: response});
    } catch (error) {
        console.error(error);
    }
}

function* addListSaga(action) {
    try {
        yield call(axiosInstance.post, `/api/lists`, action.payload);
        yield put({type: FETCH_LISTS_REQUEST, payload: action.payload.board_id});
    } catch (error) {
        console.error(error.message);
    }
}

function* updateListSaga(action) {
    try {
        yield call(axiosInstance.put, `/api/lists/${action.payload.id}`, action.payload);
        yield put({type: FETCH_LISTS_REQUEST, payload: action.payload.board_id});
    } catch (error) {
        console.error(error.message);
    }
}

function* moveListSaga(action) {
    try {
        yield call(axiosInstance.put, `/api/lists/move`, action.payload);
        yield put({type: FETCH_LISTS_REQUEST, payload: action.payload.board_id});
    } catch (error) {
        console.error(error.message);
    }
}

export function* listSaga() {
    yield takeLatest(FETCH_LISTS_REQUEST, fetchListsSaga);
    yield takeLatest(ADD_LIST_REQUEST, addListSaga);
    yield takeLatest(UPDATE_LIST_REQUEST, updateListSaga);
    yield takeLatest(MOVE_LIST, moveListSaga);
}
