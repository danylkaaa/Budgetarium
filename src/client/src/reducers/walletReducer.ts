import {IWalletsState} from "@/models/State";
import {IActionArgs} from "@/actions/actionTypes";
import {ActionTypes, WalletsArgs} from "@/actions";

const initialState: IWalletsState = {
    wallets: [],
    selectedWallet: null
};

const createWallet = (state: IWalletsState, action: WalletsArgs.ICreateWalletSuccessAction): IWalletsState => {
    return {
        ...state,
        selectedWallet: action.wallet
    };
};

const saveWallets = (state: IWalletsState, action: WalletsArgs.ILoadWalletsSuccessAction): IWalletsState => {
    return {
        ...state,
        wallets: action.wallets
    };
};
const deleteWallets = (state: IWalletsState, action: WalletsArgs.IDeleteWalletAction): IWalletsState => {
    const selectedWallet = state.selectedWallet ? state.selectedWallet.id === action.id ? null : state.selectedWallet : null;
    return {
        ...state,
        wallets: state.wallets.filter(x => x.id !== action.id),
        selectedWallet,
    };
};

const disableSelected = (state: IWalletsState): IWalletsState => {
    return {
        ...state,
        selectedWallet: null
    };
};

const selectWallet = (state: IWalletsState, action: WalletsArgs.ISelectWalletAction): IWalletsState => {
    return {
        ...state,
        selectedWallet: action.wallet,
    };
};

const removeTransactionFromSelectedWallet = (state: IWalletsState, action: WalletsArgs.IRemoveTransactionFromSelectedWallet): IWalletsState => {
    const selectedWallet = {...state.selectedWallet} as any;
    if (selectedWallet) {
        selectedWallet.transactions = selectedWallet.transactions.filter((x: any) => x.id !== action.id);
    }
    return {
        ...state,
        selectedWallet,
    };
};
const reducer = (state = initialState, action: IActionArgs): IWalletsState => {
    switch (action.type) {
        case ActionTypes.WALLET_CREATE_SUCCESS:
            return createWallet(state, action as WalletsArgs.ICreateWalletSuccessAction);
        case ActionTypes.WALLETS_LOADING_SUCCESS:
            return saveWallets(state, action as WalletsArgs.ILoadWalletsSuccessAction);
        case ActionTypes.WALLET_DELETE_SUCCESS:
            return deleteWallets(state, action as WalletsArgs.IDeleteWalletAction);
        case ActionTypes.AUTH_LOGOUT:
            return disableSelected(state);
        case ActionTypes.SELECT_WALLET:
            return selectWallet(state, action as WalletsArgs.ISelectWalletAction);
        case ActionTypes.AUTH_LOGOUT:
            return initialState;
        case ActionTypes.REMOVE_TRANSACTION_FROM_CURRENT_WALLET:
            return removeTransactionFromSelectedWallet(state, action as WalletsArgs.IRemoveTransactionFromSelectedWallet);
        default:
            return state;
    }
};


export default reducer;