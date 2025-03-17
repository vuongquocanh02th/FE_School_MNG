import axiosInstance from "../../resources/axiosConfig.js";
import {call, put, takeLatest} from "redux-saga/effects";
import {
    LOGIN,
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    REGISTER,
    REGISTER_ERROR,
    REGISTER_SUCCESS
} from "../../redux/auth/authAction.js";
import {toast} from "react-toastify";

function* login(action) {
    try {
        const data = yield call (axiosInstance.post, "/auth/login", action.payload);
        yield put({type: LOGIN_SUCCESS, payload: data})
    } catch (err) {
        yield put({type: LOGIN_ERROR, payload: err})
    }
}

function* register(action) {
    try {
        const data = yield call (axiosInstance.post, "/auth/register", action.payload);
        toast.success("Đăng ký thành công");
        yield put({type: REGISTER_SUCCESS, payload: data})
    } catch (err) {
        yield put({type: REGISTER_ERROR, payload: err})
    }
}

export default function* authSaga() {
    yield takeLatest(LOGIN, login)
    yield takeLatest(REGISTER, register)
}