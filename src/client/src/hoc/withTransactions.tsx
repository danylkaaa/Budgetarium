import * as React from "react";
import {IState} from "@/models/State";
import {connect} from "react-redux";
import * as Redux from "redux";
import {ITransaction} from "@/models/Transaction";
import {ITransactionCreateMutationVars, ITransactionsGetQueryVars} from "@/graphql/mutations/transaction";
import {CreateTransactionCommand, DeleteTransactionCommand, LoadTransactionsCommand} from "@/actions/transactionsCommands";
import {disableSelectedTransaction, selectTransaction} from "@/actions/transactionsArgs";

interface IExternalProps {
    [key: string]: any;
}

interface IStateInjectedProps {
    selectedTransactions: ITransaction[];
    selectedTransaction:ITransaction|null;
    isLoading: boolean;
}

interface IDispatchInjectedProps {
    loadTransactions: (query: ITransactionsGetQueryVars) => any;
    deleteTransaction: (id: string) => any;
    createTransaction: (args: ITransactionCreateMutationVars) => any;
    disableSelectedTransaction: () => any;
    selectTransaction:(transaction:ITransaction)=>any;
}

type IInjectedProps = IStateInjectedProps & IDispatchInjectedProps;

export {IInjectedProps as ITransactionsProps};

const mapStateToProps = (state: IState): IStateInjectedProps => {
    return {
        isLoading: Boolean(state.app.loaders.indexOf("transactions") >= 0),
        selectedTransactions: state.transactions.selectedTransactions,
        selectedTransaction:state.transactions.selectedTransaction,
    };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch<any, IState>): IDispatchInjectedProps => {
    return {
        loadTransactions: (query: ITransactionsGetQueryVars) => dispatch(new LoadTransactionsCommand().execute(query || {})),
        deleteTransaction: (id: string) => dispatch(new DeleteTransactionCommand().execute({id})),
        createTransaction: (args: ITransactionCreateMutationVars) => dispatch(new CreateTransactionCommand().execute(args)),
        disableSelectedTransaction: () => dispatch(disableSelectedTransaction()),
        selectTransaction:(transaction:ITransaction)=>dispatch(selectTransaction(transaction)),
    };
};

export default () =>
    <TOriginalProps extends {}>
    (
        Component:
            (React.ComponentClass<TOriginalProps & IInjectedProps>
                | React.StatelessComponent<TOriginalProps & IInjectedProps>)
    ) => {
        return connect<IStateInjectedProps, IDispatchInjectedProps, TOriginalProps>(mapStateToProps, mapDispatchToProps)(Component);
    };

