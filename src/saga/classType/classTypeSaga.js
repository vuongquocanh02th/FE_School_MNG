import { call, put, takeLatest } from "redux-saga/effects";
import axiosInstance from "../../resources/axiosConfig";
import {fetchClassTypesFailure, fetchClassTypesSuccess} from "../../redux/classType/classTypeAction.js";


function* fetchClassTypesWorker() {
    try {
        const res = yield call(() => axiosInstance.get("/api/class-types"));
        yield put(fetchClassTypesSuccess(res));
    } catch (err) {
        yield put(fetchClassTypesFailure(err.message));
    }
}

export default function* classTypeSaga() {
    yield takeLatest("FETCH_CLASS_TYPES", fetchClassTypesWorker);
}
