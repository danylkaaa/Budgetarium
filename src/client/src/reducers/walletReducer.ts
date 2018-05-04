import {IAppState, IWalletsState} from "@/models/State";
import {IActionArgs} from "@/actions/actionTypes";
import {ActionTypes, WalletsArgs} from "@/actions";
import * as _ from "lodash";

const initialState: IWalletsState= {
    wallets: [],
    selectedWallet:null
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


const reducer = (state = initialState, action: IActionArgs):IWalletsState => {
    switch (action.type) {
        case ActionTypes.WALLET_CREATE_SUCCESS:
            return createWallet(state, action as WalletsArgs.ICreateWalletSuccessAction);
        case ActionTypes.WALLETS_LOADING_SUCCESS:
            return saveWallets(state, action as WalletsArgs.ILoadWalletsSuccessAction);
        default:
            return state;
    }
};


export default reducer;