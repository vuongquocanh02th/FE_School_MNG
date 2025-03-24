import axios from "axios";

export const FETCH_LISTS_REQUEST = "FETCH_LISTS_REQUEST";
export const FETCH_LISTS_SUCCESS = "FETCH_LISTS_SUCCESS";
export const FETCH_LISTS_FAILURE = "FETCH_LISTS_FAILURE";

export const ADD_LIST_REQUEST = "ADD_LIST_REQUEST";
export const ADD_LIST_SUCCESS = "ADD_LIST_SUCCESS";
export const ADD_LIST_FAILURE = "ADD_LIST_FAILURE";

export const UPDATE_LIST_REQUEST = "UPDATE_LIST_REQUEST";
export const UPDATE_LIST_SUCCESS = "UPDATE_LIST_SUCCESS";
export const UPDATE_LIST_FAILURE = "UPDATE_LIST_FAILURE";

// Chỉ cần dispatch action, Redux Saga sẽ lo gọi API
export const fetchLists = (boardId) => ({
    type: FETCH_LISTS_REQUEST,
    payload: boardId,
});

export const addList = (newList) => ({
    type: ADD_LIST_REQUEST,
    payload: newList,
});

export const updateList = (listData) => ({
    type: UPDATE_LIST_REQUEST,
    payload: listData,
});