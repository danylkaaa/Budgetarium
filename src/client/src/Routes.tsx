import { Switch, Route } from "react-router-dom";
import App from "@cont/App";
import Home from "@cont/Home/Home";
import * as React from "react";



export default function () {
    return (
        <Switch>
            <Route path="/" exact={true} component={App} />
            <Route path="/home" component={Home} />}>
        </Switch>
    );
}