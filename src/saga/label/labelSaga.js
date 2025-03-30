import { call, put, takeLatest } from "redux-saga/effects";
import axiosInstance from "../../resources/axiosConfig.js";
import {
    ADD_LABEL_REQUEST,
    addLabelFailure,
    addLabelSuccess,
    FETCH_LABELS_BY_BOARD_REQUEST, fetchLabelsByBoard, fetchLabelsFailure,
    fetchLabelsSuccess
} from "../../redux/label/labelAction.js";

function* fetchLabelsByBoardSaga(action) {
    try {
        const response = yield call(
            axiosInstance.get,
            `/api/labels/board/${action.payload}`
        );
        yield put(fetchLabelsSuccess(action.payload, response));
    } catch (error) {
        yield put(fetchLabelsFailure(error.message));
    }
}

function* addLabelSaga(action) {
    try {
        const { boardId, labelData } = action.payload;

        const response = yield call(axiosInstance.post, `/api/labels/add`, {
            boardId,
            title: labelData.title,
            color: labelData.color
        });


        if (!response.data) {
            throw new Error(" Response data is undefined");
        }

        yield put(addLabelSuccess(boardId, response.data));
        yield put(fetchLabelsByBoard(boardId));
    } catch (error) {
        yield put(addLabelFailure(error.response?.data || error.message));
    }
}


export default function* labelSaga() {
    yield takeLatest(FETCH_LABELS_BY_BOARD_REQUEST, fetchLabelsByBoardSaga);
    yield takeLatest(ADD_LABEL_REQUEST, addLabelSaga);
}
