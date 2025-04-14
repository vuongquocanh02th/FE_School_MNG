import {combineReducers} from "@reduxjs/toolkit";
import {authReducer} from "./auth/authReducer.js";
import {userReducer} from "./user/userReducer.js";
import {classReducer} from "./class/classReducer.js";
import {classTypeReducer} from "./classType/classTypeReducer.js";
import {staffReducer} from "./staff/staffReducer.js";

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    class: classReducer,
    staff: staffReducer,
    classType: classTypeReducer,
});

export default rootReducer;