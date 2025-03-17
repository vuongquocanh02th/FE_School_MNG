import {CLOSE_DRAWER, OPEN_DRAWER, TOGGLE_DRAWER} from "./dashboardAction.js";

const initialState = {
    openDrawer: true
}

export const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_DRAWER:
            return {...state, openDrawer: false};
        case CLOSE_DRAWER:
            return {...state, openDrawer: true};
        case TOGGLE_DRAWER:
            return {...state, openDrawer: !state.openDrawer};
        default:
            return state
    }
}