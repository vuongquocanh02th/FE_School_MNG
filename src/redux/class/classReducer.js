const initialState = {
    classes: [],
    loading: false,
    error: null,
};

export const classReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_CLASSES":
        case "CREATE_CLASS":
        case "UPDATE_CLASS":
        case "DELETE_CLASS":
            return { ...state, loading: true, error: null };

        case "FETCH_CLASSES_SUCCESS":
            return { ...state, loading: false, classes: action.payload };

        case "FETCH_CLASSES_FAILURE":
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};
