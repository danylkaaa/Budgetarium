import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import createHistory from "history/createHashHistory";
import {routerReducer, routerMiddleware } from "react-router-redux";

const reducer = combineReducers({
    routing: routerReducer
});
export const history = createHistory();
export const store = createStore(reducer, {}, compose(
    applyMiddleware(routerMiddleware(history))
));

