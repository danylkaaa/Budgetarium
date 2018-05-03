import {combineReducers} from "redux";
import {persistReducer} from "redux-persist";
import auth from "./auth";
import app from "./app";
import {IState} from "@/models/State";
import storage from "redux-persist/lib/storage";
import {reducer as form} from "redux-form";

const rootReducer = combineReducers<IState>({
    auth,
    app,
    form
});

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth"]
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);

