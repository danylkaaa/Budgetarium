import * as React from "react";
import * as ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import {persistor, store} from "@/store";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import Root from "@cont/Root";
import "./index.scss";

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Root/>
        </PersistGate>
    </Provider>,
    document.getElementById("root") as HTMLElement
);
registerServiceWorker();
