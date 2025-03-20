import axiosInstance from "../../resources/axiosConfig.js";
import {call, put, takeLatest} from "redux-saga/effects";
import {
    GET_BOARD_LIST,
    GET_BOARD_LIST_SUCCESS,
    CREATE_BOARD,
    CREATE_BOARD_SUCCESS,
    CREATE_BOARD_FAIL
} from "../../redux/board/boardAction.js";

function* getBoardList(action) {
    try {
        const response = yield call(axiosInstance.get, "/api/boards/" + action.payload);
        console.log("API response:", response);
        yield put({ type: GET_BOARD_LIST_SUCCESS, payload: response });
    } catch (err) {
        console.error(err);
    }
}

function* createBoard(action) {
    try {
        const response = yield call(axiosInstance.post, "/api/boards", action.payload);
        console.log("API response:", response);
        yield put({ type: CREATE_BOARD_SUCCESS, payload: response });
    } catch (err) {
        yield put({ type: CREATE_BOARD_FAIL, payload: err.message });
        console.error(err);
    }
}


export default function* boardSaga() {
    yield takeLatest(GET_BOARD_LIST, getBoardList);
    yield takeLatest(CREATE_BOARD, createBoard);
}
