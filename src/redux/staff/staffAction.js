export const fetchStaffs = () => ({ type: "FETCH_STAFFS" });
export const fetchStaffsSuccess = (staffs) => ({ type: "FETCH_STAFFS_SUCCESS", payload: staffs });
export const fetchStaffsFailure = (error) => ({ type: "FETCH_STAFFS_FAILURE", payload: error });
