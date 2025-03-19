import axiosInstance from "../../resources/axiosConfig.js";
import {call, put, takeLatest} from "redux-saga/effects";
import {GET_ALL_BOARDS, GET_BOARD_LIST, GET_BOARD_LIST_SUCCESS, SET_ALL_BOARDS} from "../../redux/board/boardAction.js";


function* getBoardList(action) {
    try {
        const data = yield call(axiosInstance.get, "/api/boards/" + action.payload);
        yield put({type: GET_BOARD_LIST_SUCCESS, payload: data});
    } catch (err) {
        console.error(err);
    }
}

function* fetchAllBoards() {
    try {
        const boardData = yield call(axiosInstance.get, "/api/boards");
        if (Array.isArray(boardData)) {
            yield put({ type: SET_ALL_BOARDS, payload: boardData });
        } else {
            console.error("Lỗi: API trả về không phải mảng", boardData);
        }
    } catch (error) {
        console.error("Lỗi khi lấy danh sách tất cả bảng:", error);
    }
}

export default function* boardSaga() {
    yield takeLatest(GET_BOARD_LIST, getBoardList);
    yield takeLatest(GET_ALL_BOARDS, fetchAllBoards);
}