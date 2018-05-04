import ActionTypes, {IActionArgs} from "./actionTypes";
import {IError} from "@/models/State";

export interface ILoadingStartAction extends IActionArgs {
    type: ActionTypes.LOADING_STARTS;
    scope: string;
}

export interface ILoadingEndAction extends IActionArgs {
    type: ActionTypes.LOADING_ENDS;
    scope: string;
}

export interface ILoadingClearAction extends IActionArgs {
    type: ActionTypes.LOADING_CLEAR;
}

export interface IAddErrorAction extends IActionArgs {
    type: ActionTypes.ADD_ERROR;
    message: string;
    scope: string;
}

export interface IRemoveErrorAction extends IActionArgs {
    type: ActionTypes.REMOVE_ERROR;
    error: IError;
}

export interface IToggleSidebarAction extends IActionArgs {
    type: ActionTypes.TOGGLE_SIDEBAR;
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

export const addError = (scope: string, message: string): IAddErrorAction => {
    return {
        type: ActionTypes.ADD_ERROR,
        scope,
        message
    };
};

export const toggleSidebar = (): IToggleSidebarAction => {
    return {
        type: ActionTypes.TOGGLE_SIDEBAR,
    };
};
export const removeError = (error: IError): IRemoveErrorAction => {
    return {
        type: ActionTypes.REMOVE_ERROR,
        error
    };
};