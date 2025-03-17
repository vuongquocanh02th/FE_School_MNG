import {combineReducers} from "@reduxjs/toolkit";
import {groupReducer} from "./group/groupReducer.js";
import {boardReducer} from "./board/boardReducer.js";
import {authReducer} from "./auth/authReducer.js";

const rootReducer = combineReducers({
    group: groupReducer,
    board: boardReducer,
    auth: authReducer
});

export default rootReducer;