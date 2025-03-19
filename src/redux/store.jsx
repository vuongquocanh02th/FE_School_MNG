import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "./rootReducer.jsx";
import createSagaMiddleware from 'redux-saga';
import rootSaga from "../saga/rootSaga.js";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
    devTools: process.env.NODE_ENV !== 'production' // Kích hoạt Redux DevTools
});

sagaMiddleware.run(rootSaga);

export default store;
