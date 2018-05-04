import * as React from "react";
import {Drawer} from "material-ui";
import AbstractSidebar, {IAbstractSidebarProps, styles} from "./AbstractSidebar";
import withStyles from "material-ui/styles/withStyles";

class MobileSidebar extends AbstractSidebar {
    public constructor(props: IAbstractSidebarProps) {
        super(props);
    }

    public render() {
        const {classes, toggle, isSidebarOpen}: any = this.props;
        const drawer = (this as any).buildDrawerList(classes);
        return (
            <div>
                <Drawer
                    open={isSidebarOpen}
                    onClose={toggle}
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

export default withStyles(styles as any,{withTheme:true})(MobileSidebar);