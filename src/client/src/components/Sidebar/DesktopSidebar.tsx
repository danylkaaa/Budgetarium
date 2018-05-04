import * as React from "react";
import {DRAWER_WIDTH} from "@/constants";
import withStyles from "material-ui/styles/withStyles";
import {Drawer, IconButton, Theme} from "material-ui";
import AbstractSidebar, {IAbstractSidebarProps} from "./AbstractSidebar";
import * as classNames from "classnames";
import {ChevronLeft} from "@material-ui/icons";
import UserInfo from "./UserInfo";

export const styles = (theme: Theme) => ({
    avatar: {
        div: {
            padding: "15px 0 20px 15px",
            height: 45
        },
        icon: {
            float: "left",
            display: "block",
            marginRight: 15,
            boxShadow: "0px 0px 0px 8px rgba(0,0,0,0.2)"
        },
        span: {
            paddingTop: 12,
            display: "block",
            color: "white",
            fontWeight: 300,
            textShadow: "1px 1px #444"
        }
    },
    drawerPaper: {
        position: "relative",
        whiteSpace: "nowrap",
        width: DRAWER_WIDTH,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing.unit * 9,
        },
    },
    toolbar: {
        display: "flex",
        alignItems: "left",
        justifyContent: "flex-end",
        padding: "0 8px",
        ...theme.mixins.toolbar,
    },
});


class DesktopSidebar extends AbstractSidebar {
    public constructor(props: IAbstractSidebarProps) {
        super(props);
    }
    public render() {
        const {classes, toggle,isSidebarOpen}: any = this.props;
        const drawer = (this as any).buildDrawerList(classes);
        return (
            <div>
                <Drawer
                    open={isSidebarOpen}
                    variant="permanent"
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    classes={{
                        paper: classNames(classes.drawerPaper, !isSidebarOpen && classes.drawerPaperClose),
                    }}
                    onClose={toggle}>
                    <div className={classes.toolbar}>
                        <IconButton onClick={toggle} style={{margin:"auto",marginRight:0}}>
                            <ChevronLeft/>
                        </IconButton>
                    </div>
                    <UserInfo/>
                    {drawer}
                </Drawer>
            </div>
        );
    }
}

export default withStyles(styles as any, {withTheme: true})(DesktopSidebar);