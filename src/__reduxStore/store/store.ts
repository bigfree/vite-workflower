// import {combineReducers, configureStore} from "@reduxjs/toolkit";
// import {CurriedGetDefaultMiddleware} from "@reduxjs/toolkit/dist/getDefaultMiddleware";
// import {setupListeners} from "@reduxjs/toolkit/query";
// import {PAUSE, PERSIST, persistReducer, persistStore} from "redux-persist";
// import {FLUSH, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";
// import {rootPersistConfig} from "./persist/persist";
// import playgroundReducer from './playground/playgroundSlice';
//
// const rootReducer = combineReducers({
//     playground: persistReducer(rootPersistConfig, playgroundReducer)
// });
//
// /**
//  * Store config
//  */
// export const store = configureStore({
//     reducer: rootReducer,
//     devTools: true,
//     middleware: (getDefaultMiddleware: CurriedGetDefaultMiddleware) => getDefaultMiddleware({
//         immutableCheck: true,
//         serializableCheck: {
//             ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//         },
//         thunk: false,
//     })
// });
//
// setupListeners(store.dispatch);
//
// export const persistor = persistStore(store);
//
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
//
// export default store;