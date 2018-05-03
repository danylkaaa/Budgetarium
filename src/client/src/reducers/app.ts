import {IAppState} from "@/models/State";
import {IAction} from "@/actions/actionTypes";
import {
    ActionTypes,
    IAddErrorAction,
    ILoadingClearAction,
    ILoadingEndAction,
    ILoadingStartAction,
    IRemoveErrorAction
} from "@/actions";
import * as _ from "lodash";

const initialState: IAppState = {
    loaders: [],
    errors: []
};

const startLoading = (state: IAppState, action: ILoadingStartAction): IAppState => {
    return {
        ...state,
        loaders: state.loaders.concat(action.scope)
    };
};

const endLoading = (state: IAppState, action: ILoadingEndAction): IAppState => {
    return {
        ...state,
        loaders: state.loaders.filter(x => x !== action.scope)
    };
};

const clearLoading = (state: IAppState, action: ILoadingClearAction): IAppState => {
    return {
        ...state,
        loaders: []
    };
};
const addError = (state: IAppState, action: IAddErrorAction): IAppState => {
    const {message, scope} = action;
    return {
        ...state,
        errors: state.errors.concat({message, scope})
    };
};

const removeError = (state: IAppState, action: IRemoveErrorAction): IAppState => {
    const {error} = action;
    return {
        ...state,
        errors: _.pull(state.errors,error)
    };
};
const reducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case ActionTypes.LOADING_STARTS:
            return startLoading(state, action as ILoadingStartAction);
        case ActionTypes.LOADING_ENDS:
            return endLoading(state, action as ILoadingEndAction);
        case ActionTypes.LOADING_CLEAR:
            return clearLoading(state, action as ILoadingClearAction);
        case ActionTypes.ADD_ERROR:
            return addError(state, action as IAddErrorAction);
        case ActionTypes.REMOVE_ERROR:
            return removeError(state, action as IRemoveErrorAction);
        default:
            return state;
    }
};


export default reducer;