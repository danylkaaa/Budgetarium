import * as React from "react";
import * as PropTypes from "prop-types";
import {withStyles} from "material-ui/styles";
import {ListItemIcon, MuiThemeProvider, Theme} from "material-ui";
import ThemeDefault from "@/theme-default";
import {ISidebarLink} from "@comp/Sidebar/SidebarItem";
import Header from "@comp/Header";
import Sidebar from "@comp/Sidebar";
import {IThemableProp} from "@/models/PropInterfaces";
import "./index.scss";
import {IHeaderButtonProps} from "@comp/Header/HeaderButton";
import * as Icons from "@material-ui/icons";
import {isWidthUp} from "material-ui/es/utils/withWidth";
import {Breakpoint} from "material-ui/styles/createBreakpoints";
import withWidth from "material-ui/utils/withWidth";
import * as _ from "lodash";
import Loader from "@comp/Loader";
import withAuth, {IAuthorizationProps} from "@hoc/withAuth";
import {connect} from "react-redux";
import {DRAWER_WIDTH} from "@/constants";
import {IState} from "@/models/State";

interface IOwnProps extends IThemableProp<MainLayout> {
    width?: Breakpoint;
}

//
// interface IDispatchProps {
//     onLogout: () => any;
//     handleClick: () => any;
// }
//
interface IStateProps {
    isSidebarOpen: boolean;
}

const styles = (theme: Theme) => ({
    root: {
        flexGrow: 1,
        zIndex: 1,
        overflow: "hidden",
        position: "relative",
        display: "flex",
        width: "100%",
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        transition: theme.transitions.create(["width", "margin", "padding"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        padding: theme.spacing.unit * 3,
    },
    toolbar: theme.mixins.toolbar,
});
// type IMainLayoutProps = IOwnProps & IDispatchProps & IStateProps;
type IMainLayoutProps = IOwnProps & IAuthorizationProps & IStateProps;

class MainLayout extends React.Component<IMainLayoutProps> {

    constructor(props: IMainLayoutProps) {
        super(props);
    }

    private headerButtons = (): IHeaderButtonProps[] => {
        return [];
    }
    private sidebarButtons = (): ISidebarLink[] => {
        return [
            {
                path: "/",
                title: "Home",
                icon: <ListItemIcon><Icons.Home/></ListItemIcon>,
            },
            {
                title: "Wallets",
                shown: this.props.isAuthenticated,
                icon: <ListItemIcon><Icons.AccountBalanceWallet/></ListItemIcon>,
                path:"/",
            },
            {
                divider: true,
                hiddenOn: {xsDown: true}
            },
            {
                path: "/login",
                title: "Login",
                shown: !this.props.isAuthenticated,
                icon: <ListItemIcon><Icons.Person/></ListItemIcon>,
                hiddenOn: {xsDown: true}
            },
            {
                path: "/register",
                title: "Register",
                shown: !this.props.isAuthenticated,
                icon: <ListItemIcon><Icons.PersonAdd/></ListItemIcon>,
                hiddenOn: {xsDown: true},
            },
            {
                title: "Logout",
                shown: this.props.isAuthenticated,
                icon: <ListItemIcon><Icons.ExitToApp/></ListItemIcon>,
                hiddenOn: {xsDown: true},
                action: this.props.logout,
            }
        ];
    }
    public sizeUp = (size: string) => {
        return isWidthUp(size as any, this.props.width as any);
    }
    public static propTypes = {
        classes: PropTypes.object.isRequired,
        theme: PropTypes.object.isRequired,
    };
    public render() {
        const {classes}: any = this.props;
        const isDesktop = this.sizeUp("md");
        const contentStyle = {
            paddingLeft: isDesktop ? !this.props.isSidebarOpen ? DRAWER_WIDTH + 20 + "px" : "90px" : 0
        };
        return (
            <MuiThemeProvider theme={ThemeDefault}>
                <div className={classes.root}>
                    <Header
                        isDesktop={isDesktop}
                        title="Budgetarium"
                        buttons={this.headerButtons()}
                    />
                    <Loader
                        isLoading={Boolean(this.props.isLoadingAuth)}
                        color="primary"
                    />
                    <Sidebar
                        links={this.sidebarButtons()}/>
                    <div className={classes.content} style={contentStyle}>
                        <div className={classes.toolbar}/>
                        {this.props.children}
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

//
const mapStateToProps = (state: IState): IStateProps => {
    return {
        isSidebarOpen: Boolean(state.app.isSidebarOpen),
    };
};
//
// const mapDispatchToProps = (dispatch: Redux.Dispatch<any, IState>): IDispatchProps => {
//         return {
//             onLogout: () => dispatch(new AuthCommands.LogoutCommand().execute()),
//             handleClick:()=>{
//                 dispatch(new AuthCommands.RefreshAccessTokenCommand().execute());
//             }
//         };
//     };


let Component = withStyles(styles as any, {withTheme: true})(MainLayout);
Component = withWidth()(Component);
Component = withAuth()(Component);
Component = connect<IStateProps, {}, IOwnProps>(mapStateToProps)(Component);

export default Component;