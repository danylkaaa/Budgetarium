import * as React from "react";
import MainLayout from "@/hoc/MainLayout";
import {Route, Switch} from "react-router-dom";
import WalletsView from "@cont/WalletsView";
import ErrorMessanger from "@comp/ErrorMessanger";
import withLoading, {ILoadingProps} from "@hoc/withLoading";
import WalletCreatePage from "@/views/WalletCreate";

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
                    <Route component={WalletsView}/>
                </Switch>
            </MainLayout>
        );
    }
}

const Component = withLoading()(Home);
export default Component;