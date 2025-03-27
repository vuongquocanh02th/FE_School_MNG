import axiosInstance from "../../resources/axiosConfig.js";
import {call, put, takeLatest} from "redux-saga/effects";
import {
    GET_BOARD_LIST,
    GET_BOARD_LIST_SUCCESS,
    CREATE_BOARD,
    CREATE_BOARD_SUCCESS,
    CREATE_BOARD_FAIL,
    GET_ALL_BOARDS, SET_ALL_BOARDS, GET_BOARD_DETAIL, GET_BOARD_DETAIL_SUCCESS, EDIT_BOARD_NAME,
} from "../../redux/board/boardAction.js";
import {toast} from "react-toastify";

function* getBoardList(action) {
    try {
        const response = yield call(axiosInstance.get, "/api/boards/" + action.payload);
        yield put({ type: GET_BOARD_LIST_SUCCESS, payload: response });
    } catch (err) {
        console.error(err);
    }
}

function* createBoard(action) {
    try {
        const response = yield call(axiosInstance.post, "/api/boards", action.payload);
        yield put({ type: CREATE_BOARD_SUCCESS, payload: response });
    } catch (err) {
        yield put({ type: CREATE_BOARD_FAIL, payload: err.message });
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

function* getBoardDetails(action) {
    try {
        const response = yield call(axiosInstance.get, "/api/boards/details/" + action.payload);
        yield put({type: GET_BOARD_DETAIL_SUCCESS, payload: response})
    } catch (error) {
        console.log(error);
    }
}

function* editBoardName(action) {
    try {
        yield call(axiosInstance.put, "/api/boards/name/" + action.payload.id, action.payload);
        toast.success("Đổi tên bảng thành công");
        yield put({type: GET_BOARD_DETAIL, payload: action.payload.id})
    } catch (error) {
        console.log(error);
    }
}

export default function* boardSaga() {
    yield takeLatest(GET_BOARD_LIST, getBoardList);
    yield takeLatest(CREATE_BOARD, createBoard);
    yield takeLatest(GET_ALL_BOARDS, fetchAllBoards);
    yield takeLatest(GET_BOARD_DETAIL, getBoardDetails);
    yield takeLatest(EDIT_BOARD_NAME, editBoardName)
}