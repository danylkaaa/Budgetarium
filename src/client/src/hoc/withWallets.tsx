import * as React from "react";
import {IState} from "@/models/State";
import {connect} from "react-redux";
import * as Redux from "redux";
import {IWallet} from "@/models/Wallet";
import {IWalletCreateMutationVars, IWalletsGetQueryVars} from "@/graphql/mutations/wallet";
import {
    CreateWalletCommand,
    DeleteWalletCommand,
    LoadWalletCommand,
    LoadWalletsCommand
} from "@/actions/walletCommands";
import {disableSelectedWallet, selectWallet} from "@/actions/walletArgs";

interface IExternalProps {
    [key: string]: any;
}

interface IStateInjectedProps {
    wallets: IWallet[];
    selectedWallet:IWallet|null;
    isLoading: boolean;
}

interface IDispatchInjectedProps {
    loadWallets: (query: IWalletsGetQueryVars) => any;
    deleteWallet: (id: string) => any;
    createWallet: (args: IWalletCreateMutationVars) => any;
    disableSelectedWallet: () => any;
    selectWallet:(wallet:IWallet)=>any;
    loadWallet:(id:string)=>any;
}

type IInjectedProps = IStateInjectedProps & IDispatchInjectedProps;

export {IInjectedProps as IWalletsProps};

const mapStateToProps = (state: IState): IStateInjectedProps => {
    return {
        isLoading: Boolean(state.app.loaders.indexOf("wallets") >= 0),
        wallets: state.wallets.wallets,
        selectedWallet:state.wallets.selectedWallet,
    };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch<any, IState>): IDispatchInjectedProps => {
    return {
        loadWallets: (query: IWalletsGetQueryVars) => dispatch(new LoadWalletsCommand().execute(query || {})),
        deleteWallet: (id: string) => dispatch(new DeleteWalletCommand().execute({id})),
        createWallet: (args: IWalletCreateMutationVars) => dispatch(new CreateWalletCommand().execute(args)),
        disableSelectedWallet: () => dispatch(disableSelectedWallet()),
        selectWallet:(wallet:IWallet)=>dispatch(selectWallet(wallet)),
            loadWallet:(id:string)=>dispatch(new LoadWalletCommand().execute({id})),
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

