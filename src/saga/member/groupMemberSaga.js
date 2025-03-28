import axiosInstance from "../../resources/axiosConfig.js";
import {call, put, takeLatest} from "redux-saga/effects";
import {
    GET_GROUP_MEMBER_LIST,
    GET_GROUP_MEMBER_LIST_SUCCESS,
    ADD_GROUP_MEMBER,
    ADD_GROUP_MEMBER_SUCCESS,
    REMOVE_GROUP_MEMBER,
    UPDATE_GROUP_MEMBER_ROLE,
    LEAVE_GROUP,
    LEAVE_GROUP_SUCCESS, TRANSFER_GROUP_OWNERSHIP
} from "../../redux/member/memberAction.js";
import {toast} from "react-toastify";

const API_URL = 'http://localhost:8080/api/members';

function* fetchMembers(action) {
    try {
        const response = yield call(axiosInstance.get, `/api/members/${action.payload}`);
        yield put({type: GET_GROUP_MEMBER_LIST_SUCCESS, payload: response});
    } catch (error) {
        console.error('Fetch member list failed', error);
    }
}

function* addMember(action) {
    try {
        const {groupId, email, memberType} = action.payload;
        const body = {type: memberType};

        yield call(
            axiosInstance.post,
            `/api/members/${groupId}?email=${encodeURIComponent(email)}`,
            body
        );

        yield put({type: ADD_GROUP_MEMBER_SUCCESS});
        yield put({type: GET_GROUP_MEMBER_LIST, payload: groupId});
    } catch (error) {
        console.error('Add member failed', error.response?.data || error);
    }
}

function* leaveGroup(action) {
    try {
        const {groupId} = action.payload;
        yield call(axiosInstance.delete, `/api/members/${groupId}`);

        yield put({type: LEAVE_GROUP_SUCCESS, payload: groupId});
    } catch (error) {
        console.error(error);
    }
}

function* removeMember(action) {
    try {
        const {groupId, userId} = action.payload;
        yield call(axiosInstance.delete, `/api/members/${groupId}/${userId}`);
        toast.success("Thành viên đã bị xóa!");
        yield put({type: GET_GROUP_MEMBER_LIST, payload: groupId});
    } catch (error) {
        console.error('Remove member failed', error.response?.data || error);
    }
}

function* updateMemberRole(action) {
    try {
        const {groupId, userId, type} = action.payload;
        yield call(
            axiosInstance.put,
            `/api/members/${groupId}/${userId}`,
            {type: type}
        );
        toast("Thay đổi quyền thành công");
        yield put({type: GET_GROUP_MEMBER_LIST, payload: groupId});
    } catch (error) {
        console.error('Update role failed', error.response?.data || error);
    }
}

function* transferOwnership(action) {
    try {
        const {groupId, userId} = action.payload;
        yield call(axiosInstance.put, `/api/members/${groupId}/${userId}/owner`);
        toast("Chuyển quyền sở hữu nhóm thành công");
        yield put({type: GET_GROUP_MEMBER_LIST, payload: groupId});
    } catch (error) {
        console.error('Transfer ownership failed', error.response?.data || error);
    }
}

export default function* groupMemberSaga() {
    yield takeLatest(GET_GROUP_MEMBER_LIST, fetchMembers);
    yield takeLatest(ADD_GROUP_MEMBER, addMember);
    yield takeLatest(REMOVE_GROUP_MEMBER, removeMember);
    yield takeLatest(UPDATE_GROUP_MEMBER_ROLE, updateMemberRole);
    yield takeLatest(LEAVE_GROUP, leaveGroup);
    yield takeLatest(TRANSFER_GROUP_OWNERSHIP, transferOwnership)
}