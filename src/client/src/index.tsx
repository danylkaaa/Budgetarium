import * as React from "react";
import * as ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import { HashRouter } from "react-router-dom";
import Routes from "./Routes";
ReactDOM.render(
    <HashRouter>
        <Routes/>
    </HashRouter>,
    document.getElementById("root") as HTMLElement
);
registerServiceWorker();
