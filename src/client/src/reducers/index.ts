import {combineReducers} from "redux";
import {persistReducer} from "redux-persist";
import auth from "./auth";
import {IState} from "@/models/State";
import storage from "redux-persist/lib/storage";
import loading from "./loading";
import apolloClient from "@/graphql";
import {ApolloClient} from "apollo-client";
import {reducer as form} from  "redux-form";

const rootReducer = combineReducers<IState>({
    auth,
    loading,
    form
});

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth"]
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);

