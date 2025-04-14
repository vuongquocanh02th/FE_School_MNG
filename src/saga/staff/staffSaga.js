import { call, put, takeLatest } from "redux-saga/effects";
import axiosInstance from "../../resources/axiosConfig";
import {fetchStaffsFailure, fetchStaffsSuccess} from "../../redux/staff/staffAction.js";


function* fetchStaffsWorker() {
    try {
        const res = yield call(() => axiosInstance.get("/api/staff-records"));
        yield put(fetchStaffsSuccess(res));
    } catch (err) {
        yield put(fetchStaffsFailure(err.message));
    }
}

export default function* staffSaga() {
    yield takeLatest("FETCH_STAFFS", fetchStaffsWorker);
}
