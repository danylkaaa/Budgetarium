import {ApolloClient} from "apollo-client";
import {createHttpLink} from "apollo-link-http";
import {setContext} from "apollo-link-context";
import {InMemoryCache} from "apollo-cache-inmemory";
import {store} from "@/store";

const httpLink = createHttpLink({
    uri: "http://127.0.0.1:4000/api/graphql",
});

const authLinkAccess = setContext((_: any, {headers}: any) => {
    // get the authentication token from local storage if it exists
    if (store.getState().auth.accessToken) {
        const token = (store.getState().auth.accessToken as any).token;
        // return the headers to the context so httpLink can read them
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : "",
            }
        };
    } else {
        return {
            headers: {
                ...headers,
            }
        };
    }
});


const authLinkRefresh = setContext((_: any, {headers}: any) => {
    // get the authentication token from local storage if it exists
    if (store.getState().auth.refreshToken) {
        const token = (store.getState().auth.refreshToken as any).token;
        // return the headers to the context so httpLink can read them
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : "",
            }
        };
    } else {
        return {
            headers: {
                ...headers,
            }
        };
    }
});


export const clientAccess = new ApolloClient({
    link: authLinkAccess.concat(httpLink),
    cache: new InMemoryCache(),
});

export const clientRefresh = new ApolloClient({
    link: authLinkRefresh.concat(httpLink),
    cache: new InMemoryCache(),
});



