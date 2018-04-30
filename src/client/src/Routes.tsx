import { Route, Router, Switch } from "react-router-dom";
import Auth from "@cont/auth/Auth";
import Home from "@cont/Home/Home";
import * as React from "react";
import { history } from "@store/index";


export default function () {
    return (
        <Router history={history}>
            <Switch>
                <Route exact={true} path="/auth" component={Auth} />
                <Route path="/" component={Home} />
            </Switch>
        </Router>
    );
}