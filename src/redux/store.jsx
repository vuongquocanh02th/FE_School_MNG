import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer.jsx";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../saga/rootSaga.js";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: false,
            serializableCheck: {
                ignoredActions: ['UPDATE_USER'],   // Bỏ qua kiểm tra cho action này
                ignoredPaths: ['user.detail.avatar'], // Bỏ qua field avatar nếu muốn
            },
        }).concat(sagaMiddleware),
    devTools: process.env.NODE_ENV !== "production",
});

sagaMiddleware.run(rootSaga);

export default store;
