import * as React from "react";
import { Route, Router, Switch } from "react-router-dom";
import { history } from "@store/index";
import routes from "@/route";
import { Store } from "react-redux";

class Root extends React.Component<{}, {}>{
    public constructor(props: any) {
        super(props);
        this.state = {};
    }
    public render(): any {
        return (
            <Router history={history} children={routes} />
        );
    }
}
export default Root;