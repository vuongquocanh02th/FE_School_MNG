import { configureStore } from "@reduxjs/toolkit";
import groupsReducer from "./groupsSlice.js";

const store = configureStore({
    reducer: {
        groups: groupsReducer,
    },
});

export default store;
