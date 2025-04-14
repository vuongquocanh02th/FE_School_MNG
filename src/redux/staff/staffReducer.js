const initialState = {
    staffs: [],
    loading: false,
    error: null,
};

export const staffReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_STAFFS":
            return { ...state, loading: true };
        case "FETCH_STAFFS_SUCCESS":
            return { ...state, loading: false, staffs: action.payload };
        case "FETCH_STAFFS_FAILURE":
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
