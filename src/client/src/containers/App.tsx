import * as React from "react";
import { Route, Router, Switch } from "react-router-dom";
import Auth from "@cont/auth/Auth";
import Home from "@cont/Home/Home";
import { history } from "@store/index";


class App extends React.Component<{}, {}>{
    public constructor(props: any) {
        super(props);
        this.state = {};
    }
    public render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact={true} path="/auth" component={Auth} />
                    <Route path="/" component={Home} />
                </Switch>
            </Router>
        );
    }
}
export default App;