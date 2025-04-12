import {all} from 'redux-saga/effects';

import userSaga from "./user/userSaga.js";
import authSaga from "./auth/authSaga.js";


export default function* rootSaga() {
    yield all([
        userSaga(),
        authSaga()
    ])
}