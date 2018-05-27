import {IAction} from "@/actions/actionTypes";
import {IState, ITransactionsState} from "@/models/State";
import {addError, endLoading, startLoading} from "@/actions/appArgs";
import * as Redux from "redux";
import {
    ITransactionCreateMutationResponse,
    ITransactionCreateMutationVars,
    ITransactionDeleteMutationVars,
    ITransactionsGetQueryVars, TRANSACTION_CREATE_MUTATION,
    TRANSACTION_DELETE_MUTATION,
    TRANSACTIONS_GET_QUERY
} from "@/graphql/mutations/transaction";
import {clientAccess} from "@/graphql";
import {transactionCreationSuccess, transactionDeleteSuccess, transactionsLoadSuccess} from "@/actions/transactionsArgs";
import {removeTransactionFromSelectedWallet} from "@/actions/walletArgs";

abstract class TransactionCommand extends IAction<ITransactionsState> {
    protected fetchFailed: TransactionFetchFailedCommand;

    public constructor() {
        super();
        this.fetchFailed = new TransactionFetchFailedCommand();
    }
}


export class CreateTransactionCommand extends TransactionCommand {
    public execute(data: ITransactionCreateMutationVars) {
        return (dispatch: Redux.Dispatch<any, IState>, getState: () => IState) => {
            dispatch(startLoading("transactions"));
            const mutation = TRANSACTION_CREATE_MUTATION;
            const variables = data;
            clientAccess.mutate({mutation, variables})
                .then(response => {
                    dispatch(endLoading("transactions"));
                    if (!response.data) {
                        throw Error("Server returns empty response");
                    } else {
                        const w = (response.data.createTransaction as ITransactionCreateMutationResponse);
                        const transaction = {
                            ...w,
                        };
                        dispatch(transactionCreationSuccess(transaction as any));
                    }
                })
                .catch((err: any) => {
                        if (err.graphQLErrors) {
                            err.graphQLErrors.forEach((e: any) => dispatch(this.fetchFailed.execute(e.message)));
                        } else {
                            dispatch(this.fetchFailed.execute(err.message));
                        }
                    }
                );
        };
    }
}

export class DeleteTransactionCommand extends TransactionCommand {
    public execute({id}: ITransactionDeleteMutationVars) {
        return (dispatch: Redux.Dispatch<any, IState>, getState: () => IState) => {
            dispatch(startLoading("transactions"));
            const mutation = TRANSACTION_DELETE_MUTATION;
            const variables = {id};
            clientAccess.mutate({mutation, variables})
                .then(response => {
                    const answer = (response.data as any);
                    clientAccess.cache.reset();
                    if (!answer) {
                        throw Error("Server returns empty response");
                    } else {
                        dispatch(endLoading("transactions"));
                        dispatch(removeTransactionFromSelectedWallet(id));
                        dispatch(transactionDeleteSuccess(id));
                    }
                })
                .catch((err: any) => {
                        if (err.graphQLErrors && err.graphQLErrors.length) {
                            err.graphQLErrors.forEach((e: any) => dispatch(this.fetchFailed.execute(e.message, "transactions")));
                        } else {
                            dispatch(this.fetchFailed.execute(err.message, "transactions"));
                        }
                    }
                );
        };
    }
}

export class LoadTransactionsCommand extends TransactionCommand {
    public execute(queryData: ITransactionsGetQueryVars) {
        return (dispatch: Redux.Dispatch<any, IState>, getState: () => IState) => {
            dispatch(startLoading("transactions"));
            const query = TRANSACTIONS_GET_QUERY;
            const variables = queryData;
            clientAccess.query({query, variables})
                .then(response => {
                    const answer = response.data as any;
                    clientAccess.cache.reset();
                    if (!answer || !answer.transactions) {
                        throw Error("Server returns empty response");
                    } else {
                        dispatch(endLoading("transactions"));
                        dispatch(transactionsLoadSuccess(answer.transactions as any));
                    }
                })
                .catch((err: any) => {

                        if (err.graphQLErrors && err.graphQLErrors.length) {
                            err.graphQLErrors.forEach((e: any) => dispatch(this.fetchFailed.execute(e.message)));
                        } else {
                            dispatch(this.fetchFailed.execute(err.message));
                        }
                    }
                );
        };
    }
}


// end fetching data end show error message
class TransactionFetchFailedCommand extends IAction<IState> {
    public execute(message: string, scope = "transactions") {
        return (dispatch: Redux.Dispatch<any, IState>, getState: () => IState) => {
            dispatch(endLoading(scope));
            if (message) {
                dispatch(addError(scope, message));
            } else {
                dispatch(addError(scope, "Some error"));
            }
        };
    }
}

