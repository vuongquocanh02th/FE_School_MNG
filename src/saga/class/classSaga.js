import { call, put, takeLatest } from "redux-saga/effects";
import axiosInstance from "../../resources/axiosConfig";
import {
    fetchClassesSuccess,
    fetchClassesFailure,
    fetchClasses
} from "../../redux/class/classAction";

function* fetchClassesWorker() {
    try {
        const res = yield call(() => axiosInstance.get("/api/classes"));
        yield put(fetchClassesSuccess(res));
    } catch (err) {
        yield put(fetchClassesFailure(err.message));
    }
}

function* createClassWorker(action) {
    try {
        yield call(() => axiosInstance.post("/api/classes", action.payload));
        yield put(fetchClasses()); // reload
    } catch (err) {
        yield put(fetchClassesFailure(err.message));
    }
}

function* updateClassWorker(action) {
    try {
        yield call(() => axiosInstance.post("/api/classes", action.payload));
        yield put(fetchClasses());
    } catch (err) {
        yield put(fetchClassesFailure(err.message));
    }
}

function* deleteClassWorker(action) {
    try {
        yield call(() => axiosInstance.delete(`/api/classes/${action.payload}`));
        yield put(fetchClasses());
    } catch (err) {
        yield put(fetchClassesFailure(err.message));
    }
}

export default function* classSaga() {
    yield takeLatest("FETCH_CLASSES", fetchClassesWorker);
    yield takeLatest("CREATE_CLASS", createClassWorker);
    yield takeLatest("UPDATE_CLASS", updateClassWorker);
    yield takeLatest("DELETE_CLASS", deleteClassWorker);
}
