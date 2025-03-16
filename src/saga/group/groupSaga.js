import api from "../../resources/axiosConfig.js";
import {call, put} from "redux-saga/effects";
import {GET_GROUP_LIST_SUCCESS, GET_GROUP_INFO_SUCCESS} from "../../redux/group/groupAction.js";

export function* getGroupList() {
    try {
        const data = yield call (api.get, "/api/group");
        yield put({type: GET_GROUP_LIST_SUCCESS, payload: data});
    } catch (err) {
        console.error(err);
    }
}

export function* getGroupInfo(action) {
    try {
        const data = yield call (api.get, "/api/group/" + action.payload);
        yield put({type: GET_GROUP_INFO_SUCCESS, payload: data});
    } catch (err) {
        console.error(err);
    }
}