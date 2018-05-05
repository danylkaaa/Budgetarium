import * as React from "react";
import {IWallet} from "../../models/Wallet";
import withLoading, {ILoadingProps} from "../../hoc/withLoading";
import {IState} from "../../models/State";
import {IWalletsGetQueryVars} from "../../graphql/mutations/wallet";
import Wallet from "../../components/Wallet/index";
import Loader from "../../components/Loader/index";
import {Link} from "react-router-dom";
import withWallets, {IWalletsProps} from "../../hoc/withWallets";
import {Redirect} from "react-router";

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

type IProps = IOwnProps & ILoadingProps & IStateProps & IDispatchProps & IWalletsProps;

class WalletsView extends React.Component<IProps, IWalletViewState> {
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
        this.props.loadWallets({});
    }

    public fetchNew = () => {
        this.props.loadWallets({});
    }

    public render() {
        return (
            <div>
                {this.state.redirect}
                <div className="field has-addons">
                    <p className="control">
                        <button className="button" onClick={this.fetchNew}>
                            <span className="icon is-small">
                                <i className="fas fa-sync-alt"/>
                            </span>
                            <span>Reload</span>
                        </button>
                    </p>
                    <p className="control">
                        <Link to="/wallets/new">
                            <button className="button">
                              <span className="icon is-small">
                                <i className="fas fa-plus"/>
                              </span>
                                <span>Create</span>
                            </button>
                        </Link>
                    </p>
                </div>
                <div className="notification is-primary">
                    <p className="title is-4">Wallets</p>
                </div>
                <Loader
                    isLoading={Boolean(this.props.isLoadingScope("wallets"))}
                    color="primary"
                />
                <div className="container">
                    <div className="columns is-desktop is-multiline">
                        {this.renderWallets()}
                    </div>
                </div>
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

let Component = withWallets()(WalletsView as any) as any;
Component = withLoading()(Component as any) as any;
export default Component;
