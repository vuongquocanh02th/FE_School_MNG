const initialState = {
    classTypes: [],
    loading: false,
    error: null,
};

export const classTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_CLASS_TYPES":
            return { ...state, loading: true };
        case "FETCH_CLASS_TYPES_SUCCESS":
            return { ...state, loading: false, classTypes: action.payload };
        case "FETCH_CLASS_TYPES_FAILURE":
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
