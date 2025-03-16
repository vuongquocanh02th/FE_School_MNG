import { takeLatest } from "redux-saga/effects";
import {GET_GROUP_INFO, GET_GROUP_LIST} from "../redux/group/groupAction.js";
import {getGroupInfo, getGroupList} from "./group/groupSaga.js";
import {GET_BOARD_LIST} from "../redux/board/boardAction.js";
import {getBoardList} from "./board/boardSaga.js";

export default function* rootSaga() {
    yield takeLatest(GET_GROUP_LIST, getGroupList);
    yield takeLatest(GET_GROUP_INFO, getGroupInfo);
    yield takeLatest(GET_BOARD_LIST, getBoardList);
}