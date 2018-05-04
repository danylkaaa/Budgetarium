import * as React from "react";
import {IWallet} from "@/models/Wallet";
import * as Redux from "redux";
import withLoading, {ILoadingProps} from "@hoc/withLoading";
import {IState} from "@/models/State";
import {connect} from "react-redux";
import {IWalletsGetQueryVars} from "@/graphql/mutations/wallet";
import Wallet from "@comp/Wallet";
import {WalletsCommands} from "@/actions";
import Loader from "@comp/Loader";
import {Link} from "react-router-dom";

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
    wallets: IWallet | null;
}

type IProps = IOwnProps & ILoadingProps & IStateProps & IDispatchProps;

class WalletsView extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }

    private renderWallets = () => {
        return this.props.wallets.map((w: IWallet, i: number) => (
            <Wallet wallet={w} key={i}/>
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
                    isLoading={Boolean(this.props.isLoading("wallets"))}
                    color="primary"
                />
                {this.renderWallets()}
            </div>
        );
    }
}

const mapStateToProps = (state: IState): IStateProps => {
    return {
        wallets: state.wallets.wallets,
    };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch<any, IState>): IDispatchProps => {
    return {
        loadWallets: (query: IWalletsGetQueryVars) => dispatch(new WalletsCommands.LoadWalletsCommand().execute(query))
    };
};

let Component = connect<IStateProps, IDispatchProps, IProps>(mapStateToProps, mapDispatchToProps)(WalletsView);
Component = withLoading()(Component);
export default Component;
