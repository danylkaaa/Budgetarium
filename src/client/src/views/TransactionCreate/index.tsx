import * as React from "react";
import {reduxForm} from "redux-form";
import CreateTransactionForm from "./Form";
import Loader from "@comp/Loader";
import ErrorMessanger from "@comp/ErrorMessanger";
import  {ITransactionsProps} from "@hoc/withTransactions";
import {default as withLoading, ILoadingProps} from "@hoc/withLoading";
import {default as withAuth, IAuthorizationProps} from "@hoc/withAuth";
import {Redirect} from "react-router";
import withTransactions from "@hoc/withTransactions";
import withWallets, {IWalletsProps} from "@hoc/withWallets";

interface ICState {
    shouldRedirect: boolean;
}

// final props
type IProps = ILoadingProps & ITransactionsProps & IAuthorizationProps&IWalletsProps;


class TransactionCreatePage extends React.Component<IProps, ICState> {

    public constructor(props: any) {
        super(props);
        this.state = {
            shouldRedirect: false,
        };
    }

    private handleConfirm = (args: any) => {
        if(!this.props.selectedWallet){
            return;
        }
        const wallet=this.props.selectedWallet.id;
        this.props.createTransaction({
            value:Number(args.value),
            category:args.category,
            name:args.name,
            currency:args.currency,
            wallet
        });
    }

    public componentWillReceiveProps(newProps: IProps) {
        if (newProps.selectedTransaction && newProps.selectedTransaction !== this.props.selectedTransaction) {
            this.setState({...this.state, shouldRedirect: true});
        }
    }

    public componentDidMount() {
        this.props.disableSelectedTransaction();
    }

    public render() {
        if (!this.props.isAuthenticated || !this.props.selectedWallet) {
            return (<Redirect to="/"/>);
        }
        const wallet = this.props.selectedWallet;
        if (this.state.shouldRedirect) {
            return (<Redirect to={wallet ? `/wallet/${wallet.id}` : "/wallets"}/>);
        }
        return (
            <div>
                <ErrorMessanger trigger={/transactions/} stackLength={3}/>
                <Loader
                    isLoading={Boolean(this.props.isLoadingScope("transaction"))}
                    color="primary"
                />
                <div>
                    <CreateTransactionForm onSubmit={this.handleConfirm}/>
                </div>
            </div>
        );
    }
}


let Component = withLoading()(TransactionCreatePage as any);
Component = withAuth()(Component as any) as any;
Component = withWallets()(Component as any) as any;
Component = withTransactions()(Component as any) as any;
Component = reduxForm({
    form: "Create wallet",
})(Component as any) as any;
export default Component;