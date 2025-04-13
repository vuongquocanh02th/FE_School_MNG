import {loginFailure, loginSuccess, registerFailure, registerSuccess} from "../../redux/auth/authAction.js";
import axiosInstance from "../../resources/axiosConfig.js";
import { call, put, takeLatest } from "redux-saga/effects";
import {jwtDecode} from "jwt-decode";

function* loginWorker(action) {
    try {
        const response = yield call(() =>
            axiosInstance.post("api/auth/login", action.payload)
        );

        const token = response;
        console.log("📦 Token nhận được:", token);

        const decoded = jwtDecode(token);  // ✅ phải là object chứa userType
        console.log("🔍 Decoded JWT:", decoded);

        const userInfo = {
            username: decoded.sub,
            userType: decoded.userType,
            fullName: decoded.fullName,
        };

        // Lưu Redux và localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("userInfo", JSON.stringify(userInfo));

        yield put(loginSuccess({ token, userInfo }));
        window.location.href = "/home";

    } catch (err) {
        console.error("❌ Login error:", err);
        yield put(loginFailure("Sai tên đăng nhập hoặc mật khẩu", err));
    }
}

function* registerWorker(action) {
    try {
        yield call(() => axiosInstance.post("api/auth/register", action.payload));
        yield put(registerSuccess());
        window.location.href = "/login"; // chuyển sang login khi đăng ký xong
    } catch (err) {
        yield put(registerFailure("Đăng ký thất bại. Kiểm tra lại thông tin.", err));
    }
}

export default function* authSaga() {
    yield takeLatest("LOGIN_REQUEST", loginWorker);
    yield takeLatest("REGISTER_REQUEST", registerWorker);
}