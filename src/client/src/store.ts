import {applyMiddleware, compose, createStore, Store} from "redux";
import reduxThunk from "redux-thunk";
import {persistedReducer} from "./reducers";
import {IState} from "@/models/State";
import {persistStore} from "redux-persist";


function getCompose() {
    if (process.env.NODE_ENV !== "production" && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
        return (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    } else {
        return compose;
    }
}

export const store: Store<IState> = createStore(
    persistedReducer as any,
    getCompose()(
        applyMiddleware(reduxThunk),
    )
);
export const persistor = persistStore(store);
