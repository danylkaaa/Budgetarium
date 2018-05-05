import * as React from "react";
import MainLayout from "@/hoc/MainLayout";
import {Route, Switch} from "react-router-dom";
import WalletsView from "@/views/WalletsView";
import ErrorMessanger from "@comp/ErrorMessanger";
import withLoading, {ILoadingProps} from "@hoc/withLoading";
import WalletCreatePage from "@/views/WalletCreate";
import TransactionCreatePage from "@/views/TransactionCreate";
import WalletFullView from "@/views/WalletFullView";

interface IOwnProps extends ILoadingProps {
    [key: string]: any;
}

type IProps = IOwnProps;

class Home extends React.Component<IProps, {}> {
    public static propTypes = {};

    public constructor(props: any) {
        super(props);
        this.state = {};
    }

    public render() {
        return (
            <MainLayout>
                <ErrorMessanger trigger={/.+/} stackLength={3}/>
                <Switch>
                    <Route path="/wallets/new" exactly={true} component={WalletCreatePage}/>
                    <Route path="/transaction/new" exactly={true} component={TransactionCreatePage}/>
                    <Route path="/wallets/:id" component={WalletFullView}/>
                    <Route component={WalletsView}/>
                </Switch>
            </MainLayout>
        );
    }
}

const Component = withLoading()(Home);
export default Component;