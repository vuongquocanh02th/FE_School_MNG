export const FETCH_SUBJECTS = "FETCH_SUBJECTS";
export const SET_SUBJECTS = "SET_SUBJECTS";
export const CREATE_SUBJECT = "CREATE_SUBJECT";
export const UPDATE_SUBJECT = "UPDATE_SUBJECT";
export const DELETE_SUBJECT = "DELETE_SUBJECT";

export const fetchSubjects = () => ({ type: FETCH_SUBJECTS });
export const setSubjects = (subjects) => ({ type: SET_SUBJECTS, payload: subjects });
export const createSubject = (subject) => ({ type: CREATE_SUBJECT, payload: subject });
export const updateSubject = (subject) => ({ type: UPDATE_SUBJECT, payload: subject });
export const deleteSubject = (id) => ({ type: DELETE_SUBJECT, payload: id });