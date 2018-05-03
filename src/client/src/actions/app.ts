import ActionTypes, {IAction} from "./actionTypes";
import {IError} from "@/models/State";

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

export interface IAddErrorAction {
    type: ActionTypes.ADD_ERROR;
    message: string;
    scope: string;
}

export interface IRemoveErrorAction {
    type: ActionTypes.REMOVE_ERROR;
    error: IError;
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


export const removeError= (error: IError): IRemoveErrorAction => {
    return {
        type: ActionTypes.REMOVE_ERROR,
        error
    };
};