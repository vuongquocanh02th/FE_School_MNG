import {combineReducers} from "@reduxjs/toolkit";
import {groupReducer} from "./group/groupReducer.js";
import {boardReducer} from "./board/boardReducer.js";
import {authReducer} from "./auth/authReducer.js";
import {dashboardReducer} from "./dashboard/dashboardReducer.js";
import {memberGroupReducer} from "./member/memberGroupReducer.js";

const rootReducer = combineReducers({
    group: groupReducer,
    board: boardReducer,
    auth: authReducer,
    dashboard: dashboardReducer,
    membersGroup: memberGroupReducer
});

export default rootReducer;