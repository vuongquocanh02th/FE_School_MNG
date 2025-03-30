import {combineReducers} from "@reduxjs/toolkit";
import {groupReducer} from "./group/groupReducer.js";
import {boardReducer} from "./board/boardReducer.js";
import {authReducer} from "./auth/authReducer.js";
import {dashboardReducer} from "./dashboard/dashboardReducer.js";
import {memberGroupReducer} from "./member/memberGroupReducer.js";
import {listReducer} from "./list/listReducer.js";
import {cardReducer} from "./card/cardReducer.js";
import {labelReducer} from "./label/labelReducer.js";
import {userReducer} from "./user/userReducer.js";

const rootReducer = combineReducers({
    group: groupReducer,
    board: boardReducer,
    auth: authReducer,
    dashboard: dashboardReducer,
    membersGroup: memberGroupReducer,
    list: listReducer,
    card: cardReducer,
    user: userReducer,
    label: labelReducer,
});

export default rootReducer;