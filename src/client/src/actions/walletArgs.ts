import ActionTypes, {IActionArgs} from "./actionTypes";
import {IError} from "@/models/State";
import {IWallet} from "@/models/Wallet";

export interface ICreateWalletSuccessAction extends IActionArgs {
    type: ActionTypes.WALLET_CREATE_SUCCESS;
    wallet:IWallet;
}

export interface ILoadWalletsSuccessAction extends IActionArgs {
    type: ActionTypes.WALLETS_LOADING_SUCCESS;
    wallets:IWallet[];
}

export const walletCreationSuccess= (wallet:IWallet): ICreateWalletSuccessAction => {
    return {
        type: ActionTypes.WALLET_CREATE_SUCCESS,
        wallet
    };
};
export const walletsLoadSuccess= (wallets:IWallet[]): ILoadWalletsSuccessAction => {
    return {
        type: ActionTypes.WALLETS_LOADING_SUCCESS,
        wallets
    };
};
