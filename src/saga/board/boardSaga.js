import axiosInstance from "../../resources/axiosConfig.js";
import {call, put, takeLatest} from "redux-saga/effects";
import {GET_BOARD_LIST, GET_BOARD_LIST_SUCCESS} from "../../redux/board/boardAction.js";

function* getBoardList(action) {
    try {
        const data = yield call(axiosInstance.get, "/api/boards/" + action.payload);
        yield put({type: GET_BOARD_LIST_SUCCESS, payload: data});
    } catch (err) {
        console.error(err);
    }
}

export default function* boardSaga() {
    yield takeLatest(GET_BOARD_LIST, getBoardList);
}