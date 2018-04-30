import * as React from "react";
import * as PropTypes from "prop-types";
import {withStyles} from "material-ui/styles";
import {Drawer, Divider, List, Hidden, Theme} from "material-ui";
import {IThemableProp, themablePropTypes} from "@/types/PropInterfaces";
import {DRAWER_WIDTH} from "@/constants";
import {mailFolderListItems, otherMailFolderListItems} from "@comp/Sidebar/SidebarList";

interface ISidebarProps extends IThemableProp<Sidebar> {
    handleChangeRequestNavDrawer: () => any;
    isSidebarOpen: boolean;
}


const styles = (theme: Theme) => ({
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: DRAWER_WIDTH,
        [theme.breakpoints.up("md")]: {
            position: "relative",
        },
    }
});

class Sidebar extends React.Component<ISidebarProps, {}> {
    public static propTypes = {
        ...themablePropTypes,
    };

    public constructor(props: ISidebarProps) {
        super(props);
    }


    private drawer = (classes: any) => {
        return (
            <div>
                <div className={classes.toolbar}/>
                <Divider/>
                <List>{mailFolderListItems}</List>
                <Divider/>
                <List>{otherMailFolderListItems}</List>
            </div>
        );
    }

    public render() {
        const {classes}: any = this.props;
        const {isSidebarOpen} = this.props;
        const drawer = this.drawer(classes);
        return (
            <div>
                <Hidden mdUp={true}>
                    <Drawer
                        onClose={this.props.handleChangeRequestNavDrawer}
                        open={isSidebarOpen}
                        variant="temporary"
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden smDown={true} implementation="css">
                    <Drawer
                        variant="permanent"
                        onClose={this.props.handleChangeRequestNavDrawer}
                        open={isSidebarOpen}
                        classes={{
                            paper: classes.drawerPaper,
                        }}>
                        {drawer}
                    </Drawer>
                </Hidden>
            </div>
        );
    }
}

export default withStyles(styles as any, {withTheme: true})(Sidebar);