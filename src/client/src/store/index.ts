import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import createHistory from "history/createHashHistory";
import { routerReducer, routerMiddleware } from "react-router-redux";
import { persistStore, persistReducer } from "redux-persist";
import localStorage from "redux-persist/lib/storage";

export const history = createHistory();

const rootReducer = combineReducers({
    routing: routerReducer
});

const persistConfig = {
    key: "root",
    storage: localStorage
};


const reducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = (process.env.NODE_ENV !== "production") ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;

const enhancer = composeEnhancers(
    applyMiddleware(routerMiddleware(history)),
);

export const store = createStore(reducer as any, {}, enhancer);
export const persistor = persistStore(store);

