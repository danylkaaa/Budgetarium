import * as React from "react";
import {themablePropTypes} from "@/models/PropInterfaces";
import {reduxForm} from "redux-form";
import CreateWalletForm from "./Form";
import Loader from "@comp/Loader";
import ErrorMessanger from "@comp/ErrorMessanger";
import withWallets, {IWalletsProps} from "@hoc/withWallets";
import {default as withLoading, ILoadingProps} from "@hoc/withLoading";
import {IAuthorizationProps, default as withAuth} from "@hoc/withAuth";
import {Redirect} from "react-router";

interface ICState{
    shouldRedirect:boolean;
}
// final props
type IProps = ILoadingProps & IWalletsProps & IAuthorizationProps;


class WalletCreatePage extends React.Component<IProps, ICState> {

    public constructor(props: any) {
        super(props);
        this.state={
            shouldRedirect:false,
        };
    }

    private handleConfirm = (args: any) => {
        this.props.createWallet(args);
    }
    public componentWillReceiveProps(newProps:IProps){
        if(newProps.selectedWallet && newProps.selectedWallet!==this.props.selectedWallet){
            this.setState({...this.state,shouldRedirect:true});
        }
    }
    public  componentDidMount(){
        this.props.disableSelectedWallet();
    }

    public render() {
        if (!this.props.isAuthenticated) {
            return (<Redirect to="/"/>);
        }
        const wallet=this.props.selectedWallet;
        if(this.state.shouldRedirect){
            return (<Redirect to={wallet?`/wallet/${wallet.id}`:"/wallets"}/>);
        }
        return (
            <div>
                <ErrorMessanger trigger={/wallet/} stackLength={3}/>
                <Loader
                    isLoading={Boolean(this.props.isLoadingScope("wallet"))}
                    color="primary"
                />
                <div>
                    <CreateWalletForm onSubmit={this.handleConfirm}/>
                </div>
            </div>
        );
    }
}


let Component = withLoading()(WalletCreatePage as any);
Component=withAuth()(Component as any) as any;
Component = withWallets()(Component as any) as any;
Component = reduxForm({
    form: "Create wallet",
})(Component as any) as any;
export default Component;