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
import {connect} from "react-redux";
import {IState} from "@/models/State";
import * as Redux from "redux";
import {AuthActions} from "@/actions";

import Loader from "@comp/Loader";
import {addError} from "@/actions/app";

interface IOwnProps extends IThemableProp<MainLayout> {
    width?: Breakpoint;
}

interface IDispatchProps {
    onLogout: () => any;
    handleClick:()=>any;
}

interface IStateProps {
    isAuthenticated: boolean;
    isLoading: boolean;
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
        padding: theme.spacing.unit * 3,
    },
    toolbar: theme.mixins.toolbar,
});
type IMainLayoutProps = IOwnProps & IDispatchProps & IStateProps;

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
                action: this.props.onLogout,
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
        return (
            <MuiThemeProvider theme={ThemeDefault}>
                <div className={classes.root}>
                    <Header
                        isDesktop={isDesktop}
                        title="Budgetarium"
                        buttons={this.headerButtons()}
                        />
                    <Loader
                        isLoading={Boolean(this.props.isLoading)}
                        color="primary"
                    />
                    <Sidebar
                        links={this.sidebarButtons()}/>
                    <div className={classes.content}>
                        <div className={classes.toolbar}/>
                        <button
                            onClick={this.props.handleClick}
                            className="button is-info">
                            click me
                        </button>
                        {this.props.children}
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}


const mapStateToProps = (state: IState): IStateProps => {
    return {
        isAuthenticated: Boolean(state.auth.user),
        isLoading: !state.app.loaders.length,
    };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch<any, IState>): IDispatchProps => {
        return {
            onLogout: () => dispatch(new AuthActions.LogoutAction().execute()),
            handleClick:()=>{
                dispatch(new AuthActions.RefreshAccessTokenAction().execute());
            }
        };
    };

export default connect<IStateProps, IDispatchProps, IOwnProps>(mapStateToProps, mapDispatchToProps)(
    withWidth()(withStyles(styles as any, {withTheme: true})(MainLayout)));