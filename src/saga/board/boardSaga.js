import api from "../../resources/axiosConfig.js";
import {call, put} from "redux-saga/effects";
import {GET_BOARD_LIST_SUCCESS} from "../../redux/board/boardAction.js";

export function* getBoardList(action) {
    try {
        const data = yield call (api.get, "/api/boards/" + action.payload);
        yield put({type: GET_BOARD_LIST_SUCCESS, payload: data});
    } catch (err) {
        console.error(err);
    }
}