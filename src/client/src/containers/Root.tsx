import * as React from "react";
import {Route, Router, Switch} from "react-router-dom";
import createHistory from "history/createHashHistory";
import {Store} from "react-redux";
import Login from "@/views/Login";
import Home from "@/views/Home";
import Register from "@/views/Register";
import {withAuthGuard} from "@hoc/AuthGuard";
import "./index.scss";

const history = createHistory();

interface IChildRoute {
    path: string;
    component: any;
    exactly?: boolean;
}

const childRoutes: IChildRoute[] = [
    {
        path: "/login",
        component: Login,
        exactly: true
    },
    {
        path: "/register",
        component: Register,
        exactly: true
    },
    {
        path: "/",
        component: withAuthGuard({unauthorizedComponent: <Login/>})(Home)
    },
];

class Root extends React.Component<{}, {}> {
    protected routes = () => {
        return childRoutes.map((route: IChildRoute, i: number) => (
            <Route
                path={route.path}
                exactly={route.exactly}
                key={i}
                component={route.component}/>
        ));
    }

    public render(): any {
        const style = {
            // backgroundImage: "url(" + bgImage + ")",
            /* Center and scale the image nicely */
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
        };
        return (
            <div style={style}>
                <Router history={history}>
                    <Switch>
                        {this.routes()}
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default Root;