import axiosInstance from "../../resources/axiosConfig.js";
import { call, put, takeLatest } from "redux-saga/effects";
import {
    GET_USER_DETAIL,
    GET_USER_DETAIL_SUCCESS,
    GET_USER_DETAIL_FAIL,
    UPDATE_USER,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
} from "../../redux/user/UserAction.js";

const API_URL = 'http://localhost:8080/api/users';

// Lấy chi tiết user theo id
function* fetchUserDetail(action) {
    try {
        const response = yield call(axiosInstance.get, `${API_URL}/${action.payload}`);
        yield put({ type: GET_USER_DETAIL_SUCCESS, payload: response });
        console.log("✅ Lấy chi tiết user thành công: ", response);
    } catch (error) {
        const errorMsg = error.response?.data?.message || "Lỗi khi tải thông tin người dùng!";
        yield put({ type: GET_USER_DETAIL_FAIL, payload: errorMsg });
        console.error("❌ Lỗi lấy thông tin user:", errorMsg);
    }
}

function* updateUserSaga(action) {
    try {
        const { id, data } = action.payload;
        const formData = new FormData();
        formData.append("username", data.username);
        formData.append("email", data.email);
        formData.append("description", data.description);
        if (data.avatar) {
            formData.append("avatar", data.avatar);
        }
        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }

        // Không thêm headers content-type thủ công!
        const response = yield call(axiosInstance.post, `http://localhost:8080/api/users/${id}`, formData);

        yield put({ type: "UPDATE_USER_SUCCESS", payload: response.data });
    } catch (error) {
        console.error("Update user error:", error);
        yield put({ type: "UPDATE_USER_FAILURE", payload: "Lỗi khi cập nhật người dùng!" });
    }
}

export default function* userSaga() {
    yield takeLatest(GET_USER_DETAIL, fetchUserDetail);
    yield takeLatest(UPDATE_USER, updateUserSaga);
}
