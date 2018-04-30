import * as React from "react";
import * as ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import { store,persistor } from "@store/index";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import Routes from "./Routes";
ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Routes />
        </PersistGate>
    </Provider>,
    document.getElementById("root") as HTMLElement
);
registerServiceWorker();
