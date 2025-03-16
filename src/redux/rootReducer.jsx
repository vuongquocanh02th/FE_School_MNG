import {combineReducers} from "@reduxjs/toolkit";
import {groupReducer} from "./group/groupReducer.js";
import {boardReducer} from "./board/boardReducer.js";

const rootReducer = combineReducers({
    group: groupReducer,
    board: boardReducer
});

export default rootReducer;