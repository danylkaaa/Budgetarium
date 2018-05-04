import {IAppState} from "@/models/State";
import {IActionArgs} from "@/actions/actionTypes";
import {ActionTypes, App} from "@/actions";
import * as _ from "lodash";

const initialState: IAppState = {
    loaders: [],
    errors: [],
    isSidebarOpen: false
};

const startLoading = (state: IAppState, action: App.ILoadingStartAction): IAppState => {
    return {
        ...state,
        loaders: state.loaders.concat(action.scope)
    };
};

const endLoading = (state: IAppState, action: App.ILoadingEndAction): IAppState => {
    return {
        ...state,
        loaders: state.loaders.filter(x => x !== action.scope)
    };
};

const clearLoading = (state: IAppState, action: App.ILoadingClearAction): IAppState => {
    return {
        ...state,
        loaders: []
    };
};
const addError = (state: IAppState, action: App.IAddErrorAction): IAppState => {
    const {message, scope} = action;
    return {
        ...state,
        errors: state.errors.concat({message, scope})
    };
};

const removeError = (state: IAppState, action: App.IRemoveErrorAction): IAppState => {
    const {error} = action;
    return {
        ...state,
        errors: _.pull(state.errors, error)
    };
};

const toggleSidebar = (state: IAppState, action: App.IToggleSidebarAction): IAppState => {
    return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen,
    };
};

const reducer = (state = initialState, action: IActionArgs) => {
    switch (action.type) {
        case ActionTypes.LOADING_STARTS:
            return startLoading(state, action as App.ILoadingStartAction);
        case ActionTypes.LOADING_ENDS:
            return endLoading(state, action as App.ILoadingEndAction);
        case ActionTypes.LOADING_CLEAR:
            return clearLoading(state, action as App.ILoadingClearAction);
        case ActionTypes.ADD_ERROR:
            return addError(state, action as App.IAddErrorAction);
        case ActionTypes.REMOVE_ERROR:
            return removeError(state, action as App.IRemoveErrorAction);
        case ActionTypes.TOGGLE_SIDEBAR:
            return toggleSidebar(state, action as App.IToggleSidebarAction);

        default:
            return state;
    }
};


export default reducer;