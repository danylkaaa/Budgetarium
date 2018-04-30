import * as React from "react";
import withRoot from "@hoc/withRoot";
import Header from "@comp/Header";
import * as PropTypes from "prop-types";

interface IMainLayoutProps extends React.Props<MainLayout> {
    navBarOpen: boolean;
    width?: number;
}

interface IMainLayoutState {
    navDrawerOpen: boolean;
}
class MainLayout extends React.Component<IMainLayoutProps, IMainLayoutState>{
    public static propTypes = {
        navBarOpen: PropTypes.bool
    };
    public constructor(props: IMainLayoutProps) {
        super(props);
        this.state = {
            navDrawerOpen: false
        };
    }
    public componentWillReceiveProps(nextProps: IMainLayoutProps) {
        if (this.props.width !== nextProps.width) {
            this.setState({ navDrawerOpen: true });
        }
    }

    private handleChangeRequestNavDrawer() {
        this.setState({
            navDrawerOpen: !this.state.navDrawerOpen
        });
    }

    public render() {
        const { navDrawerOpen } = this.state;
        const paddingLeftDrawerOpen = 236;
        const styles = {
            header: {
                paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0
            },
            container: {
                margin: "80px 20px 20px 15px"
            }
        };

        return withRoot(
            <h1>
                <Header styles={styles.header} handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer} />
                <div style={styles.container}>
                    {this.props.children}
                </div>
            </h1>
        );
    }
}
export default MainLayout;