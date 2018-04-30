import * as React from "react";
import {DRAWER_WIDTH} from "@/constants";
import withStyles from "material-ui/styles/withStyles";
import {Drawer, Theme, IconButton} from "material-ui";
import {default as AbstractSidebar, IAbstractSidebarProps} from "./AbstractSidebar";
import * as classNames from "classnames";
import {ChevronLeft} from "@material-ui/icons";

export const styles = (theme: Theme) => ({
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
        alignItems: "center",
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
        const {classes, iconsToggleHandler, onlyIcons}: any = this.props;
        const drawer = this.drawer(classes);
        return (
            <div>
                <Drawer
                    open={onlyIcons}
                    variant="permanent"
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    classes={{
                        paper: classNames(classes.drawerPaper, onlyIcons && classes.drawerPaperClose),
                    }}
                    onClose={iconsToggleHandler}>
                    <div className={classes.toolbar}>
                        <IconButton onClick={iconsToggleHandler}>
                            <ChevronLeft/>
                        </IconButton>
                    </div>
                    {drawer}
                </Drawer>
            </div>
        );
    }
}

export default withStyles(styles as any, {withTheme: true})(DesktopSidebar);