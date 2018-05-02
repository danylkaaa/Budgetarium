import {ILoadingState} from "@/models/State";
import {IAction} from "@/actions/actionTypes";
import {ILoadingClearAction, ILoadingEndAction, ILoadingStartAction} from "@/actions/loading";
import {ActionTypes} from "@/actions";

const initialState: ILoadingState = {
    scopes: [],
};

const startLoading = (state: ILoadingState, action: ILoadingStartAction): ILoadingState => {
    return {
        scopes: state.scopes.concat(action.scope)
    };
};

const endLoading = (state: ILoadingState, action: ILoadingEndAction): ILoadingState => {
    return {
        scopes: state.scopes.filter(x => x !== action.scope)
    };
};

const clearLoading = (state: ILoadingState, action: ILoadingClearAction): ILoadingState => {
    return {
        scopes: []
    };
};

const reducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case ActionTypes.LOADING_STARTS:
            return startLoading(state, action as ILoadingStartAction);
        case ActionTypes.AUTH_SUCCESS:
            return endLoading(state, action as ILoadingEndAction);
        case ActionTypes.LOADING_CLEAR:
            return clearLoading(state, action as ILoadingClearAction);
        default:
            return state;
    }
};


export default reducer;