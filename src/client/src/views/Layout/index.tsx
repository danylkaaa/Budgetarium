// import * as React from "react";
// import * as PropTypes from "prop-types";
// import {bindActionCreators} from "redux";
// import {connect} from "react-redux";
// import {Route, Redirect} from "react-router-dom";
// import {childRoutes, IChildRoute} from "@route";
// import {MuiThemeProvider, Theme} from "material-ui";
// import Header from "@comp/Header";
// import Footer from "@comp/Footer";
// import Sidebar from "@comp/Sidebar";
//
// interface IAppProps extends React.Props<App> {
//     width: number;
// }
//
// interface IAppState {
//     navDrawerOpen: boolean;
// }
//
// class App extends React.Component<IAppProps, IAppState> {
//     public static propTypes = {
//         children: PropTypes.element,
//         width: PropTypes.number,
//     };
//
//     public constructor(props: IAppProps) {
//         super(props);
//         this.state = {
//             navDrawerOpen: false
//         };
//     }
//
//     private handleChangeRequestNavDrawer = () => {
//         this.setState({
//             navDrawerOpen: !this.state.navDrawerOpen
//         });
//     }
//
//     public render() {
//         const {navDrawerOpen} = this.state;
//         return (
//             <MuiThemeProvider theme={ThemeDefault}>
//                 <Header
//                     handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer}/>
//                 <Sidebar
//                     navDrawerOpen={navDrawerOpen}/>
//                 <div>
//                     {this.props.children}
//                 </div>
//                 <Footer/>
//             </MuiThemeProvider>
//         );
//     }
// }
//
//
// export default App;


import * as React from "react";
import * as PropTypes from "prop-types";
import {withStyles} from "material-ui/styles";
import {MuiThemeProvider, Theme} from "material-ui";
import ThemeDefault from "@/theme-default";
import {ISidebarLink,default as sidebarLinks} from "@/sidebar-links";
import Header from "@comp/Header";
import Sidebar from "@comp/Sidebar";
import {IThemableProp} from "@/types/PropInterfaces";


interface IAppProps extends IThemableProp<App> {
}

interface IAppState {
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

class App extends React.Component<IAppProps, IAppState> {

    constructor(props: IAppProps) {
        super(props);
        this.state = {
            isSidebarOpen: false,
            onlyIconsInSidebar: false,
        };
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
        return (
            <MuiThemeProvider theme={ThemeDefault}>
                <div className={classes.root}>
                    <Header
                        openToggleHandler={this.handleDrawerToggle}
                        iconsToggleHandler={this.handleDrawerIconsToggle}
                        isSidebarOpen={this.state.isSidebarOpen}
                        onlyIcons={this.state.onlyIconsInSidebar}/>
                    <Sidebar
                        links={sidebarLinks}
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


export default withStyles(styles as any, {withTheme: true})(App);