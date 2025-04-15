import {SET_TIMETABLES} from "./timeTableAction.js";

const initialState = {
    timeTables: [],
};

const timeTableReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TIMETABLES:
            return { ...state, timeTables: action.payload };
        default:
            return state;
    }
};

export default timeTableReducer;