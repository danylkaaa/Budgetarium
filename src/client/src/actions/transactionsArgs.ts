import ActionTypes, {IActionArgs} from "./actionTypes";
import {ITransaction} from "@/models/Transaction";

export interface ICreateTransactionSuccessAction extends IActionArgs {
    type: ActionTypes.TRANSACTION_CREATE_SUCCESS;
    transaction: ITransaction;
}

export interface IDisableSelectedAction {
    type: ActionTypes.DISABLE_SELECTED_TRANSACTION;
}

export interface ILoadTransactionsSuccessAction extends IActionArgs {
    type: ActionTypes.TRANSACTION_LOADING_SUCCESS;
    transactions: ITransaction[];
}

export interface IDeleteTransactionAction {
    type: ActionTypes.TRANSACTION_DELETE_SUCCESS;
    id: string;
}

export interface ISelectTransactionAction {
    type: ActionTypes.SELECT_TRANSACTION;
    transaction: ITransaction;
}

export const transactionCreationSuccess = (transaction: ITransaction): ICreateTransactionSuccessAction => {
    return {
        type: ActionTypes.TRANSACTION_CREATE_SUCCESS,
        transaction
    };
};
export const transactionsLoadSuccess = (transactions: ITransaction[]): ILoadTransactionsSuccessAction => {
    return {
        type: ActionTypes.TRANSACTION_LOADING_SUCCESS,
        transactions
    };
};
export const disableSelectedTransaction = (): IDisableSelectedAction => {
    return {
        type: ActionTypes.DISABLE_SELECTED_TRANSACTION
    };
};
export const transactionDeleteSuccess = (id: string): IDeleteTransactionAction => {
    return {
        type: ActionTypes.TRANSACTION_DELETE_SUCCESS,
        id
    };
};

export const selectTransaction = (transaction: ITransaction): ISelectTransactionAction => {
    return {
        type: ActionTypes.SELECT_TRANSACTION,
        transaction
    };
};