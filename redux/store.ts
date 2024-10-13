import { configureStore } from "@reduxjs/toolkit";
import  rootReducer  from "./slice";
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'


const persistConfig = {
    key: 'root',
    storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const  store = configureStore({
    reducer: persistedReducer
})

export const persistor = persistStore(store)

export type rootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;