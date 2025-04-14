import { call, put, takeLatest } from "redux-saga/effects";


import axiosInstance from "../../resources/axiosConfig.js";
import {
    CREATE_SUBJECT, DELETE_SUBJECT,
    FETCH_SUBJECTS,
    fetchSubjects,
    setSubjects,
    UPDATE_SUBJECT
} from "../../redux/subject/subjectAction.js";

function* fetchSubjectsSaga() {
    const res = yield call(() => axiosInstance.get("/api/subjects"));
    yield put(setSubjects(res));
}

function* createSubjectSaga(action) {
    yield call(() => axiosInstance.post("/api/subjects", action.payload));
    yield put(fetchSubjects());
}

function* updateSubjectSaga(action) {
    yield call(() => axiosInstance.put(`/api/subjects/${action.payload.id}`, action.payload));
    yield put(fetchSubjects());
}

function* deleteSubjectSaga(action) {
    yield call(() => axiosInstance.delete(`/api/subjects/${action.payload}`));
    yield put(fetchSubjects());
}

export default function* subjectSaga() {
    yield takeLatest(FETCH_SUBJECTS, fetchSubjectsSaga);
    yield takeLatest(CREATE_SUBJECT, createSubjectSaga);
    yield takeLatest(UPDATE_SUBJECT, updateSubjectSaga);
    yield takeLatest(DELETE_SUBJECT, deleteSubjectSaga);
}
