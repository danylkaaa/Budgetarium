import * as React from "react";
import {IWallet} from "../../models/Wallet";
import withLoading, {ILoadingProps} from "../../hoc/withLoading";
import {IWalletsGetQueryVars} from "../../graphql/mutations/wallet";
import Wallet from "../../components/Wallet/index";
import Loader from "../../components/Loader/index";
import withWallets, {IWalletsProps} from "../../hoc/withWallets";
import {Redirect} from "react-router";
import withTransactions, {ITransactionsProps} from "@hoc/withTransactions";
import {AppBar, Tab, Tabs} from "material-ui";
import * as Icons from "@material-ui/icons";
import TransactionTableView from "@comp/TransactionTableView";
import AllTransactionTableStrategy from "@comp/TransactionTableView/AllTransactionTableStrategy";
import {Link} from "react-router-dom";
import {ITransaction} from "@/models/Transaction";
import AbstaractTableBuilderStrategy from "@comp/TransactionTableView/AbstaractTableBuilderStrategy";
import GainTransactionsTableStrategy from "@comp/TransactionTableView/GainTransactionsTableStrategy";
import SpendingTransactionsTableStrategy from "@comp/TransactionTableView/SpendingTransactionsTableStrategy";
import BuildChartsTableStrategy from "@comp/TransactionTableView/BuildChartsTableStrategy";


interface IOwnProps extends ILoadingProps {
    id: string;
}

interface IDispatchProps {
    loadWallets: (query: IWalletsGetQueryVars) => any;
}

interface IStateProps {
    wallets: IWallet[];
}

type IProps = IOwnProps & ILoadingProps & IStateProps & IDispatchProps & IWalletsProps & ITransactionsProps;

interface IWFWState {
    currentTab: number;
    redirect: any | null;
    strategies: AbstaractTableBuilderStrategy[];
}

class WalletsFullView extends React.Component<IProps, IWFWState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            redirect: null,
            currentTab: 0,
            strategies: [new AllTransactionTableStrategy(), new GainTransactionsTableStrategy(), new SpendingTransactionsTableStrategy(), new BuildChartsTableStrategy()],
        };
    }

    private handleChangeTab = (event: any, value: number) => {
        this.setState({
            ...this.state,
            currentTab: value
        });
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
        this.props.loadWallet((this.props as any).match.params.id);
    }
    private handleDelete = (transaction: ITransaction) => {
        return () => this.props.deleteTransaction(transaction.id);
    }

    public render() {
        if (!this.props.selectedWallet) {
            return null;
        }
        const transactions = (this.props.selectedWallet as any).transactions;
        const wallet = (this.props as any).selectedWallet;
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
                        <Link to="/transaction/new">
                            <button className="button">
                              <span className="icon is-small">
                                <i className="fas fa-plus"/>
                              </span>
                                <span>Add</span>
                            </button>
                        </Link>
                    </p>
                </div>
                <Loader isLoading={this.props.isLoadingScope("wallets")} color="secondary"/>
                <Loader isLoading={this.props.isLoadingScope("transactions")} color="primary"/>
                {
                    this.props.selectedWallet &&
                    <Wallet wallet={this.props.selectedWallet}/>
                }
                < AppBar position="static" color="default">
                    <Tabs
                        value={this.state.currentTab}
                        indicatorColor="primary"
                        onChange={this.handleChangeTab}
                        textColor="secondary"
                        centered={true}
                        fullWidth={true}
                    >
                        <Tab label="All" icon={<Icons.AccountBalance/>}/>
                        <Tab label="Gain" icon={<Icons.KeyboardArrowUp/>}/>
                        <Tab label="Spending" icon={<Icons.KeyboardArrowDown/>}/>
                        <Tab label="Charts" icon={<Icons.InsertChart/>}/>
                    </Tabs>
                </AppBar>
                <br/>
                {
                    transactions &&
                    <TransactionTableView
                        wallet={wallet}
                        transactions={transactions}
                        onDelete={this.handleDelete}
                        strategy={this.state.strategies[this.state.currentTab]}/>
                }
            </div>
        );
    }
}

let Component = withWallets()(WalletsFullView as any) as any;
Component = withTransactions()(Component as any) as any;
Component = withLoading()(Component as any) as any;
export default Component;
