import * as React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "@/views/Home";
import Layout from "@/views/Layout";
import Login from "@/views/Login";
import Register from "@/views/Register";

export const childRoutes:IChildRoute[] = [
    {
        "path": "/home",
        "component": Home,
        "exactly": true
    }
];

const routes = (
    <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/" component={Layout} />
    </Switch>
);

export interface IChildRoute{
    path:string;
    component: any;
    exactly:boolean;
}
export default routes;
