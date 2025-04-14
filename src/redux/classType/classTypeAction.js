export const fetchClassTypes = () => ({ type: "FETCH_CLASS_TYPES" });
export const fetchClassTypesSuccess = (data) => ({ type: "FETCH_CLASS_TYPES_SUCCESS", payload: data });
export const fetchClassTypesFailure = (error) => ({ type: "FETCH_CLASS_TYPES_FAILURE", payload: error });
