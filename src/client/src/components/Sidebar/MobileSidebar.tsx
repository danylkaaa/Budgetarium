import * as React from "react";
import {DRAWER_WIDTH} from "@/constants";
import withStyles from "material-ui/styles/withStyles";
import {IconButton, Drawer, Theme} from "material-ui";
import {default as AbstractSidebar, IAbstractSidebarProps, styles} from "./AbstractSidebar";
import * as classNames from "classnames";

class MobileSidebar extends AbstractSidebar {
    public constructor(props: IAbstractSidebarProps) {
        super(props);
    }

    public render() {
        const {classes, openToggleHandler, isSidebarOpen}: any = this.props;
        const drawer = this.buildDrawerList(classes);
        return (
            <div>
                <Drawer
                    open={isSidebarOpen}
                    onClose={openToggleHandler}
                    variant="temporary"
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    classes={{
                        paper: classes.drawerPaper
                    }}>
                    {drawer}
                </Drawer>
            </div>
        );
    }
}

export default withStyles(styles as any, {withTheme: true})(MobileSidebar);