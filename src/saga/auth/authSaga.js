import {loginFailure, loginSuccess, registerFailure, registerSuccess} from "../../redux/auth/authAction.js";
import axiosInstance from "../../resources/axiosConfig.js";
import { call, put, takeLatest } from "redux-saga/effects";

function* loginWorker(action) {
    try {
        const response = yield call(() =>
            axiosInstance.post("api/auth/login", action.payload)
        );
        const token = response.data;
        localStorage.setItem("token", token);
        yield put(loginSuccess(token));
        window.location.href = "/home"; // chuyển đến Home.jsx
    } catch (err) {
        yield put(loginFailure("Sai tên đăng nhập hoặc mật khẩu"));
    }
}

function* registerWorker(action) {
    try {
        yield call(() => axiosInstance.post("api/auth/register", action.payload));
        yield put(registerSuccess());
        window.location.href = "/login"; // chuyển sang login khi đăng ký xong
    } catch (err) {
        yield put(registerFailure("Đăng ký thất bại. Kiểm tra lại thông tin."));
    }
}

export default function* authSaga() {
    yield takeLatest("LOGIN_REQUEST", loginWorker);
    yield takeLatest("REGISTER_REQUEST", registerWorker);
}