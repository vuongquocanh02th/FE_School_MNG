import { configureStore } from "@reduxjs/toolkit";
import groupsReducer from "./groupsSlice.jsx";

const store = configureStore({
    reducer: {
        groups: groupsReducer,
    },
});

export default store;
