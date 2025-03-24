import {
    FETCH_LISTS_SUCCESS,
    FETCH_LISTS_FAILURE,
    ADD_LIST_SUCCESS,
    UPDATE_LIST_SUCCESS,
    ADD_LIST_REQUEST,
    ADD_LIST_FAILURE,
} from "./listAction";

const initialState = {
    lists: [],
    error: null,
    loading: false,
};

export const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_LISTS_SUCCESS:
            return { ...state, lists: action.payload.sort((a, b) => a.priority - b.priority), error: null, loading: false };

        case FETCH_LISTS_FAILURE:
            return { ...state, error: action.payload, loading: false };

        case ADD_LIST_REQUEST:
            return { ...state, loading: true };

        case ADD_LIST_SUCCESS:
            console.log("✅ ADD_LIST_SUCCESS action nhận được:", action.payload);
            return {
                ...state,
                lists: [...state.lists, action.payload].sort((a, b) => a.priority - b.priority),
                loading: false,
            };

        case ADD_LIST_FAILURE:
            return { ...state, error: action.payload, loading: false };

        case UPDATE_LIST_SUCCESS:
            return {
                ...state,
                lists: state.lists.map((list) => (list.id === action.payload.id ? action.payload : list)),
            };

        default:
            return state;
    }
};
