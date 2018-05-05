import ActionTypes, {IActionArgs} from "./actionTypes";
import {IWallet} from "@/models/Wallet";

export interface ICreateWalletSuccessAction extends IActionArgs {
    type: ActionTypes.WALLET_CREATE_SUCCESS;
    wallet: IWallet;
}

export interface IDisableSelectedAction {
    type: ActionTypes.DISABLE_SELECTED_WALLET;
}

export interface ILoadWalletsSuccessAction extends IActionArgs {
    type: ActionTypes.WALLETS_LOADING_SUCCESS;
    wallets: IWallet[];
}

export interface IDeleteWalletAction {
    type: ActionTypes.WALLET_DELETE_SUCCESS;
    id: string;
}

export interface ISelectWalletAction {
    type: ActionTypes.SELECT_WALLET;
    wallet: IWallet;
}

export interface IRemoveTransactionFromSelectedWallet {
    type: ActionTypes.REMOVE_TRANSACTION_FROM_CURRENT_WALLET;
    id: string;
}

export const walletCreationSuccess = (wallet: IWallet): ICreateWalletSuccessAction => {
    return {
        type: ActionTypes.WALLET_CREATE_SUCCESS,
        wallet
    };
};
export const walletsLoadSuccess = (wallets: IWallet[]): ILoadWalletsSuccessAction => {
    return {
        type: ActionTypes.WALLETS_LOADING_SUCCESS,
        wallets
    };
};
export const disableSelectedWallet = (): IDisableSelectedAction => {
    return {
        type: ActionTypes.DISABLE_SELECTED_WALLET
    };
};
export const walletDeleteSuccess = (id: string): IDeleteWalletAction => {
    return {
        type: ActionTypes.WALLET_DELETE_SUCCESS,
        id
    };
};
export const removeTransactionFromSelectedWallet = (id: string): IRemoveTransactionFromSelectedWallet => {
    return {
        type: ActionTypes.REMOVE_TRANSACTION_FROM_CURRENT_WALLET,
        id
    };
};
export const selectWallet = (wallet: IWallet): ISelectWalletAction => {
    return {
        type: ActionTypes.SELECT_WALLET,
        wallet
    };
};