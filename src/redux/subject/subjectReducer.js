const initialState = {
    subjects: [],
};

export const subjectReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_SUBJECTS":
            return { ...state, subjects: action.payload };
        default:
            return state;
    }
};