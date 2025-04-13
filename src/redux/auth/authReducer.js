const token = localStorage.getItem("token");
const userInfo = JSON.parse(localStorage.getItem("userInfo"));

const initialState = {
    token: token || null,
    userInfo: userInfo || null,
    loading: false,
    error: null,
    registered: false,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN_REQUEST":
        case "REGISTER_REQUEST":
            return { ...state, loading: true, error: null, registered: false };

        case "LOGIN_SUCCESS":
            return {
                ...state,
                loading: false,
                token: action.payload.token,
                userInfo: action.payload.userInfo,
            };

        case "REGISTER_SUCCESS":
            return { ...state, loading: false, registered: true };

        case "LOGIN_FAILURE":
        case "REGISTER_FAILURE":
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

