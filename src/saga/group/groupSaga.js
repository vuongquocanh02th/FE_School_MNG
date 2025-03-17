import axiosInstance from "../../resources/axiosConfig.js";
import {call, put, takeLatest} from "redux-saga/effects";
import {
    GET_GROUP_LIST_SUCCESS,
    GET_GROUP_INFO_SUCCESS,
    ADD_GROUP_SUCCESS,
    GET_GROUP_LIST, GET_GROUP_INFO, ADD_GROUP
} from "../../redux/group/groupAction.js";
//
////// Các câu gọi API để hết trong saga
//
function* getGroupList() {
    try {
        const data = yield call (axiosInstance.get, "/api/group");
        yield put({type: GET_GROUP_LIST_SUCCESS, payload: data});
    } catch (err) {
        console.error(err);
    }
}

function* getGroupInfo(action) {
    try {
        const data = yield call (axiosInstance.get, "/api/group/" + action.payload);
        yield put({type: GET_GROUP_INFO_SUCCESS, payload: data});
    } catch (err) {
        console.error(err);
    }
}

function* addGroup(action) {
    try {
        const data = yield call (axiosInstance.post, "/api/group", action.payload);
        yield put({type: ADD_GROUP_SUCCESS, payload: data});
    } catch (err) {
        console.error(err);
    }
}

export default function* groupSaga() {
    yield takeLatest(GET_GROUP_LIST, getGroupList);
    yield takeLatest(GET_GROUP_INFO, getGroupInfo);
    yield takeLatest(ADD_GROUP, addGroup);
}