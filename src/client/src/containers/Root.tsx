import * as React from "react";
import {Router} from "react-router-dom";
import createHistory from "history/createHashHistory";
import routes from "@/route";
import {Store} from "react-redux";

export const history = createHistory();

class Root extends React.Component<{}, {}> {
    // public constructor(props: any) {
    //     super(props);
    //     this.state = {};
    // }
    public render(): any {
        return (
            <Router history={history} children={routes}/>
        );
    }
}

export default Root;