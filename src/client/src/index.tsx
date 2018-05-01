import * as React from "react";
import * as ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import {persistor, store} from "@/store";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import Root from "@cont/Root";
import "./index.scss";
import {ApolloProvider} from "react-apollo";
import GQLClient from "@/graphql";

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ApolloProvider client={GQLClient}>
                <Root/>
            </ApolloProvider>
        </PersistGate>
    </Provider>,
    document.getElementById("root") as HTMLElement
);
registerServiceWorker();
