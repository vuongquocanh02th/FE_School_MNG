export const FETCH_LABELS_BY_BOARD_REQUEST = "FETCH_LABELS_BY_BOARD_REQUEST";
export const FETCH_LABELS_BY_BOARD_SUCCESS = "FETCH_LABELS_BY_BOARD_SUCCESS";
export const FETCH_LABELS_BY_BOARD_FAILURE = "FETCH_LABELS_BY_BOARD_FAILURE";

export const ADD_LABEL_REQUEST = "ADD_LABEL_REQUEST";
export const ADD_LABEL_SUCCESS = "ADD_LABEL_SUCCESS";
export const ADD_LABEL_FAILURE = "ADD_LABEL_FAILURE";

export const fetchLabelsByBoard = (boardId) => ({
    type: FETCH_LABELS_BY_BOARD_REQUEST,
    payload: boardId,
});

export const fetchLabelsSuccess = (boardId, labels) =>({
    type: FETCH_LABELS_BY_BOARD_SUCCESS,
    payload: {boardId, labels},
});

export const fetchLabelsFailure = (error) => ({
    type: FETCH_LABELS_BY_BOARD_FAILURE,
    payload: error,
});

export const addLabel = (boardId, labelData) => ({
    type: ADD_LABEL_REQUEST,
    payload: { boardId, labelData },
});

export const addLabelSuccess = (boardId, newLabel) => ({
    type: ADD_LABEL_SUCCESS,
    payload: { boardId, newLabel },
});

export const addLabelFailure = (error) => ({
    type: ADD_LABEL_FAILURE,
    payload: error,
});