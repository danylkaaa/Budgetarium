import {combineReducers} from "redux";
import {persistReducer} from "redux-persist";
import auth from "./auth";
import {IState} from "@/models/State";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers<IState>({
    auth
});

const persistConfig = {
    key: "root",
    storage
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);

