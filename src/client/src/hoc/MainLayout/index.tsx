import * as React from "react";
import * as PropTypes from "prop-types";
import {withStyles} from "material-ui/styles";
import {ListItemIcon, MuiThemeProvider, Theme} from "material-ui";
import ThemeDefault from "@/theme-default";
import {ISidebarLink} from "@/sidebar-links";
import Header from "@comp/Header";
import Sidebar from "@comp/Sidebar";
import {IThemableProp} from "@/models/PropInterfaces";
import "./index.scss";
import {IHeaderButtonProps} from "@comp/Header/HeaderButton";
import * as Icons from "@material-ui/icons";
import {isWidthUp} from "material-ui/es/utils/withWidth";
import {Breakpoint} from "material-ui/styles/createBreakpoints";
import withWidth from "material-ui/utils/withWidth";

interface IMainLayoutProps extends IThemableProp<MainLayout> {
    width?: Breakpoint;
}

interface IMainLayoutState {
    isSidebarOpen: boolean;
    onlyIconsInSidebar: boolean;
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

class MainLayout extends React.Component<IMainLayoutProps, IMainLayoutState> {

    constructor(props: IMainLayoutProps) {
        super(props);
        this.state = {
            isSidebarOpen: false,
            onlyIconsInSidebar: false,
        };
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
                icon: <ListItemIcon><Icons.Person/></ListItemIcon>,
                hiddenOn: {xsDown: true}
            },
            {
                path: "/register",
                title: "Register",
                icon: <ListItemIcon><Icons.PersonAdd/></ListItemIcon>,
                hiddenOn: {xsDown: true}
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
    private handleDrawerToggle = () => {
        this.setState({...this.state, isSidebarOpen: !this.state.isSidebarOpen});
    }

    private handleDrawerIconsToggle = () => {
        this.setState({
            ...this.state,
            onlyIconsInSidebar: !this.state.onlyIconsInSidebar
        });
    }

    public render() {
        const {classes}: any = this.props;
        const isDesktop = this.sizeUp("md");
        return (
            <MuiThemeProvider theme={ThemeDefault}>
                <div className={classes.root}>
                    <Header
                        isDesktop={isDesktop}
                        buttons={this.headerButtons()}
                        openToggleHandler={this.handleDrawerToggle}
                        iconsToggleHandler={this.handleDrawerIconsToggle}
                        isSidebarOpen={this.state.isSidebarOpen}
                        onlyIcons={this.state.onlyIconsInSidebar}/>
                    <Sidebar
                        links={this.sidebarButtons()}
                        openToggleHandler={this.handleDrawerToggle}
                        iconsToggleHandler={this.handleDrawerIconsToggle}
                        isSidebarOpen={this.state.isSidebarOpen}
                        onlyIcons={this.state.onlyIconsInSidebar}/>
                    <div className={classes.content}>
                        <div className={classes.toolbar}/>
                        {this.props.children}
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}


export default withWidth()(withStyles(styles as any, {withTheme: true})(MainLayout));