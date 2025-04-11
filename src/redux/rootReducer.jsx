import {combineReducers} from "@reduxjs/toolkit";
import {authReducer} from "./auth/authReducer.js";
import {userReducer} from "./user/userReducer.js";

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
});

export default rootReducer;