import {all} from 'redux-saga/effects';
import groupSaga from "./group/groupSaga.js";
import boardSaga from "./board/boardSaga.js";
import authSaga from "./auth/authSaga.js";
import groupMemberSaga from "./member/groupMemberSaga.js";

export default function* rootSaga() {
    yield all([
        groupSaga(),
        boardSaga(),
        authSaga(),
        groupMemberSaga()
    ])
}