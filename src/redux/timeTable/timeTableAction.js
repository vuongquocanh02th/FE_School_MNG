export const FETCH_TIMETABLES = "FETCH_TIMETABLES";
export const SET_TIMETABLES = "SET_TIMETABLES";
export const CREATE_TIMETABLE = "CREATE_TIMETABLE";
export const UPDATE_TIMETABLE = "UPDATE_TIMETABLE";
export const DELETE_TIMETABLE = "DELETE_TIMETABLE";

export const fetchTimeTables = () => ({ type: FETCH_TIMETABLES });
export const setTimeTables = (payload) => ({ type: SET_TIMETABLES, payload });
export const createTimeTable = (payload) => ({ type: CREATE_TIMETABLE, payload });
export const updateTimeTable = (payload) => ({ type: UPDATE_TIMETABLE, payload });
export const deleteTimeTable = (id) => ({ type: DELETE_TIMETABLE, payload: id });
