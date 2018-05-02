import {ApolloClient} from "apollo-client";
import {createHttpLink} from "apollo-link-http";
import {setContext} from "apollo-link-context";
import {InMemoryCache} from "apollo-cache-inmemory";
import {store} from "@/store";


const httpLink = createHttpLink({
    uri: "http://127.0.0.1:4000/api/graphql",
});

const authLink = setContext((_: any, {headers}) => {
    // get the authentication token from local storage if it exists
    const token = store.getState().auth.accessToken;
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token.token}` : "",
        }
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client;