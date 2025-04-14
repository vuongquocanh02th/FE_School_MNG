export const fetchClasses = () => ({ type: "FETCH_CLASSES" });
export const fetchClassesSuccess = (data) => ({ type: "FETCH_CLASSES_SUCCESS", payload: data });
export const fetchClassesFailure = (error) => ({ type: "FETCH_CLASSES_FAILURE", payload: error });

export const createClass = (data) => ({ type: "CREATE_CLASS", payload: data });
export const updateClass = (data) => ({ type: "UPDATE_CLASS", payload: data });
export const deleteClass = (id) => ({ type: "DELETE_CLASS", payload: id });
