import ActionTypes, {IAction} from "./actionTypes";

export interface ILoadingStartAction extends IAction {
    type: ActionTypes.LOADING_STARTS;
    scope: string;
}

export interface ILoadingEndAction extends IAction {
    type: ActionTypes.LOADING_ENDS;
    scope: string;
}

export interface ILoadingClearAction extends IAction {
    type: ActionTypes.LOADING_CLEAR;
}

export const clearLoading = (): ILoadingClearAction => {
    return {
        type: ActionTypes.LOADING_CLEAR,
    };
};

export const startLoading = (scope: string): ILoadingStartAction => {
    return {
        type: ActionTypes.LOADING_STARTS,
        scope
    };
};

export const endLoading = (scope: string): ILoadingEndAction => {
    return {
        type: ActionTypes.LOADING_ENDS,
        scope
    };
};