import {combineReducers} from "redux";
import {persistReducer} from "redux-persist";
import auth from "./authReducer";
import app from "./appReducer";
import {IState} from "@/models/State";
import storage from "redux-persist/lib/storage";
import {reducer as form} from "redux-form";
import wallets from "./walletReducer";

const rootReducer = combineReducers<IState>({
    auth,
    wallets,
    app,
    form
});

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth"]
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);

