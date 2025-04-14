import {all} from 'redux-saga/effects';

import userSaga from "./user/userSaga.js";
import authSaga from "./auth/authSaga.js";
import classSaga from "./class/classSaga.js";
import classTypeSaga from "./classType/classTypeSaga.js";
import staffSaga from "./staff/staffSaga.js";
import subjectSaga from "./subject/subjectSaga.js";


export default function* rootSaga() {
    yield all([
        userSaga(),
        authSaga(),
        classSaga(),
        classTypeSaga(),
        staffSaga(),
        subjectSaga()
    ])
}