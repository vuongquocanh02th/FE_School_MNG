import axiosInstance from "../../resources/axiosConfig.js";
import { call, put, takeLatest } from "redux-saga/effects";
import {
    GET_MEMBERGROUP_LIST,
    GET_MEMBERGROUP_LIST_SUCCESS,
    ADD_MEMBERGROUP,
    ADD_MEMBERGROUP_SUCCESS,
    REMOVE_MEMBERGROUP,
    REMOVE_MEMBERGROUP_SUCCESS,
    UPDATE_MEMBERGROUP_ROLE,
    UPDATE_MEMBERGROUP_ROLE_SUCCESS
} from "../../redux/member/memberAction.js";

const API_URL = 'http://localhost:8080/api/members';

// Lấy danh sách thành viên theo groupId
function* fetchMembers(action) {
    try {
        const response = yield call(axiosInstance.get, `/api/members/${action.payload}`);
        console.log("Member list response:", response);
        yield put({ type: GET_MEMBERGROUP_LIST_SUCCESS, payload: response });
    } catch (error) {
        console.error('Fetch member list failed', error);
    }
}

// Thêm thành viên bằng email
function* addMember(action) {
    try {
        const { groupId, email, type } = action.payload; // Thêm tham số role
        console.log("Thêm member với: ", { groupId, email, type });
        yield call(axiosInstance.post, `${API_URL}/${groupId}`, { email, type }); // Gửi dưới dạng body
        yield put({ type: ADD_MEMBERGROUP_SUCCESS });
        yield put({ type: GET_MEMBERGROUP_LIST, payload: groupId });
    } catch (error) {
        console.error('Add member failed', error);
    }
}


// Xóa thành viên
function* removeMember(action) {
    try {
        const { groupId, userId } = action.payload;
        console.log("🗑 Xoá member với:", { groupId, userId });
        yield call(axiosInstance.delete, `/api/members/${groupId}/${userId}`);
        yield put({ type: REMOVE_MEMBERGROUP_SUCCESS });
        yield put({ type: GET_MEMBERGROUP_LIST, payload: groupId });
    } catch (error) {
        console.error('Remove member failed', error);
    }
}

// Cập nhật quyền thành viên
function* updateMemberRole(action) {
    try {
        const { groupId, userId, newRole } = action.payload;
        console.log("🔄 Update role với:", { groupId, userId, newRole });
        yield call(
            axiosInstance.put,
            `/api/members/${groupId}/${userId}`,
            { type: newRole }
        );
        yield put({ type: UPDATE_MEMBERGROUP_ROLE_SUCCESS });
        yield put({ type: GET_MEMBERGROUP_LIST, payload: groupId });
    } catch (error) {
        console.error('Update role failed', error.response?.data || error);
    }
}

export default function* memberGroupSaga() {
    yield takeLatest(GET_MEMBERGROUP_LIST, fetchMembers);
    yield takeLatest(ADD_MEMBERGROUP, addMember);
    yield takeLatest(REMOVE_MEMBERGROUP, removeMember);
    yield takeLatest(UPDATE_MEMBERGROUP_ROLE, updateMemberRole);
}
