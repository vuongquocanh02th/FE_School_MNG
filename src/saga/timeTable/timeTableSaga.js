import axiosInstance from "../../resources/axiosConfig.js";
import {
    CREATE_TIMETABLE, DELETE_TIMETABLE,
    FETCH_TIMETABLES,
    fetchTimeTables,
    setTimeTables, UPDATE_TIMETABLE
} from "../../redux/timeTable/timeTableAction.js";
import { call, put, takeLatest } from "redux-saga/effects";

function* fetchTimeTablesSaga() {
    const response = yield call(() => axiosInstance.get("/api/timetables"));
    yield put(setTimeTables(response));
}

function* createTimeTableSaga(action) {
    yield call(() => axiosInstance.post("/api/timetables", action.payload));
    yield put(fetchTimeTables());
}

function* updateTimeTableSaga(action) {
    const { id, ...rest } = action.payload;
    yield call(() => axiosInstance.put(`/api/timetables/${id}`, rest));
    yield put(fetchTimeTables());
}

function* deleteTimeTableSaga(action) {
    yield call(() => axiosInstance.delete(`/api/timetables/${action.payload}`));
    yield put(fetchTimeTables());
}

export default function* timeTableSaga() {
    yield takeLatest(FETCH_TIMETABLES, fetchTimeTablesSaga);
    yield takeLatest(CREATE_TIMETABLE, createTimeTableSaga);
    yield takeLatest(UPDATE_TIMETABLE, updateTimeTableSaga);
    yield takeLatest(DELETE_TIMETABLE, deleteTimeTableSaga);
}