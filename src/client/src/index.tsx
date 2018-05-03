import * as React from "react";
import * as ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import {persistor, store} from "@/store";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import Root from "@cont/Root";
import "./index.scss";
import client from "@/graphql";

import {ApolloProvider} from "react-apollo";
ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ApolloProvider client={client}>
                <Root/>
            </ApolloProvider>
        </PersistGate>
    </Provider>,
    document.getElementById("root") as HTMLElement
);
registerServiceWorker();
