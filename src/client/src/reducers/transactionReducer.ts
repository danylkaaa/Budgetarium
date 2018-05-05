import {ITransactionsState} from "@/models/State";
import {IActionArgs} from "@/actions/actionTypes";
import {ActionTypes, TransactionsArgs} from "@/actions";

const initialState: ITransactionsState = {
    selectedTransactions: [],
    selectedTransaction: null
};

const createTransaction = (state: ITransactionsState, action: TransactionsArgs.ICreateTransactionSuccessAction): ITransactionsState => {
    return {
        ...state,
        selectedTransaction: action.transaction
    };
};

const saveTransactions = (state: ITransactionsState, action: TransactionsArgs.ILoadTransactionsSuccessAction): ITransactionsState => {
    return {
        ...state,
        selectedTransactions: action.transactions
    };
};
const deleteTransactions = (state: ITransactionsState, action: TransactionsArgs.IDeleteTransactionAction): ITransactionsState => {
    const selectedTransaction=state.selectedTransaction?state.selectedTransaction.id === action.id ? null : state.selectedTransaction:null;
    return {
        ...state,
        selectedTransactions: state.selectedTransactions.filter(x => x.id !== action.id),
        selectedTransaction
    };
};

const disableSelected = (state: ITransactionsState): ITransactionsState => {
    return {
        ...state,
        selectedTransaction: null
    };
};

const selectTransaction = (state: ITransactionsState, action: TransactionsArgs.ISelectTransactionAction): ITransactionsState => {
    return {
        ...state,
        selectedTransaction: action.transaction,
    };
};
const reducer = (state = initialState, action: IActionArgs): ITransactionsState => {
    switch (action.type) {
        case ActionTypes.TRANSACTION_CREATE_SUCCESS:
            return createTransaction(state, action as TransactionsArgs.ICreateTransactionSuccessAction);
        case ActionTypes.TRANSACTION_LOADING_SUCCESS:
            return saveTransactions(state, action as TransactionsArgs.ILoadTransactionsSuccessAction);
        case ActionTypes.TRANSACTION_DELETE_SUCCESS:
            return deleteTransactions(state, action as TransactionsArgs.IDeleteTransactionAction);
        case ActionTypes.DISABLE_SELECTED_TRANSACTION:
            return disableSelected(state);
        case ActionTypes.SELECT_TRANSACTION:
            return selectTransaction(state, action as TransactionsArgs.ISelectTransactionAction);
        default:
            return state;
    }
};


export default reducer;