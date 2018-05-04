import * as React from "react";
import {IState} from "@/models/State";
import {connect} from "react-redux";
import * as Redux from "redux";
import {IWallet} from "@/models/Wallet";
import {IWalletsGetQueryVars} from "@/graphql/mutations/wallet";
import {LoadWalletsCommand} from "@/actions/walletCommands";

interface IExternalProps {
    [key: string]: any;
}

interface IStateInjectedProps {
    wallets: IWallet[];
    isLoading: boolean;
}

interface IDispatchInjectedProps {
    loadWallets: (query: IWalletsGetQueryVars) => any;
}

type IInjectedProps = IStateInjectedProps & IDispatchInjectedProps;

export {IInjectedProps as IWalletsProps};

const mapStateToProps = (state: IState): IStateInjectedProps => {
    return {
        isLoading: Boolean(state.app.loaders.indexOf("wallets") >= 0),
        wallets: state.wallets.wallets,
    };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch<any, IState>): IDispatchInjectedProps => {
    return {
        loadWallets: (query: IWalletsGetQueryVars) => dispatch(new LoadWalletsCommand().execute(query || {}))
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

