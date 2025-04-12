export const loginRequest = (payload) => ({
    type: "LOGIN_REQUEST",
    payload,
});

export const loginSuccess = (token) => ({
    type: "LOGIN_SUCCESS",
    payload: token,
});

export const loginFailure = (error) => ({
    type: "LOGIN_FAILURE",
    payload: error,
});

export const registerRequest = (payload) => ({
    type: "REGISTER_REQUEST",
    payload,
});

export const registerSuccess = () => ({
    type: "REGISTER_SUCCESS",
});

export const registerFailure = (error) => ({
    type: "REGISTER_FAILURE",
    payload: error,
});