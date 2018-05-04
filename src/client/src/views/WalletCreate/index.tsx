import * as React from "react";
import {themablePropTypes} from "@/models/PropInterfaces";
import {reduxForm} from "redux-form";
import CreateWalletForm from "./Form";
import Loader from "@comp/Loader";
import ErrorMessanger from "@comp/ErrorMessanger";
import withWallets, {IWalletsProps} from "@hoc/withWallets";
import {default as withLoading, ILoadingProps} from "@hoc/withLoading";
import {IAuthorizationProps} from "@hoc/withAuth";


// final props
type IProps = ILoadingProps & IWalletsProps & IAuthorizationProps;


class WalletCreatePage extends React.Component<IProps, {}> {
    public static propTypes = {
        ...themablePropTypes
    };

    public constructor(props: any) {
        super(props);
    }

    private handleConfirm = (args: any) => {
        console.log(args);
    }

    public render() {
        // if (!this.props.isAuthenticated) {
        //     return (<Redirect to="/"/>);
        // }
        return (
            <div>
                <ErrorMessanger trigger={/auth/} stackLength={3}/>
                <Loader
                    isLoading={Boolean(this.props.isLoading("wallet"))}
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
Component = withWallets()(Component as any) as any;
Component = reduxForm({
    form: "Create wallet",
})(Component as any) as any;
export default Component;