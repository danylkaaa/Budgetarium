import * as React from "react";
import {IWallet} from "../../models/Wallet";
import withLoading, {ILoadingProps} from "../../hoc/withLoading";
import {IState} from "../../models/State";
import {IWalletsGetQueryVars} from "../../graphql/mutations/wallet";
import Wallet from "../../components/Wallet/index";
import Loader from "../../components/Loader/index";
import withWallets, {IWalletsProps} from "../../hoc/withWallets";
import {Redirect} from "react-router";
import withTransactions, {ITransactionsProps} from "@hoc/withTransactions";

interface IOwnProps extends ILoadingProps {
    id: string;
}

interface IDispatchProps {
    loadWallets: (query: IWalletsGetQueryVars) => any;
}

interface IStateProps {
    wallets: IWallet[];
}

interface IWalletViewState {
    redirect: any | null;
}

type IProps = IOwnProps & ILoadingProps & IStateProps & IDispatchProps & IWalletsProps & ITransactionsProps;

class WalletsFullView extends React.Component<IProps, IWalletViewState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            redirect: null,
        };
    }

    private onDeleteWallet(id: string) {
        return () => {
            this.props.deleteWallet(id);
        };
    }

    private onAddTransaction(wallet: IWallet) {
        return () => {
            this.props.selectWallet(wallet);
            this.setState({
                ...this.state,
                redirect: <Redirect to="/transaction/new"/>
            });
        };
    }

    private renderWallets = () => {
        return this.props.wallets.map((w: IWallet, i: number) => (
            <div className="column is-6-tablet is-5-desktop" key={i}>
                <Wallet wallet={w} onDelete={this.onDeleteWallet(w.id)} onAdd={this.onAddTransaction(w)}/>
            </div>
        ));
    }

    public componentDidMount() {
        this.props.disableSelectedTransaction();
        this.props.loadWallet((this.props as any).match.params.id);
    }

    public fetchNew = () => {
        this.props.loadWallets({});
    }

    public render() {
        return (
            <div>
                {this.state.redirect}
                <Loader isLoading={this.props.isLoadingScope("wallets")} color="secondary"/>
                {
                    this.props.selectedWallet &&
                    <Wallet wallet={this.props.selectedWallet}/>
                }
            </div>
        );
    }
}

const mapStateToProps = (state: IState): IStateProps => {
    return {
        wallets: state.wallets.wallets,
    };
};
//
// const mapDispatchToProps = (dispatch: Redux.Dispatch<any, IState>): IDispatchProps => {
//     return {
//         loadWallets: (query: IWalletsGetQueryVars) => dispatch(new WalletsCommands.LoadWalletsCommand().execute(query))
//     };
// };

let Component = withWallets()(WalletsFullView as any) as any;
Component = withTransactions()(Component as any) as any;
Component = withLoading()(Component as any) as any;
export default Component;
