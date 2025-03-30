import {
    FETCH_LABELS_BY_BOARD_REQUEST,
    FETCH_LABELS_BY_BOARD_SUCCESS,
    FETCH_LABELS_BY_BOARD_FAILURE, ADD_LABEL_REQUEST, ADD_LABEL_SUCCESS, ADD_LABEL_FAILURE,
} from "./labelAction";

const initialState = {
    labelsByBoard: {},
    loading: false,
    error: null,
};

export const labelReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_LABELS_BY_BOARD_REQUEST:
            return { ...state, loading: true, error: null };

        case FETCH_LABELS_BY_BOARD_SUCCESS:
            return {
                ...state,
                loading: false,
                labelsByBoard: {
                    ...state.labelsByBoard,
                    [action.payload.boardId]: action.payload.labels,
                },
            };

        case FETCH_LABELS_BY_BOARD_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case ADD_LABEL_REQUEST:
            return { ...state, loading: true };

        case ADD_LABEL_SUCCESS: {
            const { boardId, newLabel } = action.payload;
            return {
                ...state,
                loading: false,
                labelsByBoard: {
                    ...state.labelsByBoard,
                    [boardId]: [...(state.labelsByBoard[boardId] || []), newLabel],
                },
            };
        }


        case ADD_LABEL_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};
