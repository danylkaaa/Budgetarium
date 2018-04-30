import * as React from "react";
import * as PropTypes from "prop-types";
import {withStyles} from "material-ui/styles";
import {Divider, List, Hidden, Theme} from "material-ui";
import {IThemableProp, themablePropTypes} from "@/types/PropInterfaces";
import {DRAWER_WIDTH} from "@/constants";
import {mailFolderListItems, otherMailFolderListItems} from "@comp/Sidebar/SidebarList";

export const styles = (theme: Theme) => ({
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: DRAWER_WIDTH,
        [theme.breakpoints.up("md")]: {
            position: "relative",
        },
    }
});

export interface IAbstractSidebarProps extends IThemableProp<AbstractSidebar> {
    openToggleHandler: () => any;
    isSidebarOpen: boolean;
    iconsToggleHandler: () => any;
    onlyIcons: boolean;
}

export default class AbstractSidebar extends React.Component<IAbstractSidebarProps, {}> {
    public static propTypes = {
        ...themablePropTypes,
        isSidebarOpen: PropTypes.bool.isRequired,
        openToggleHandler: PropTypes.func.isRequired,
        iconsToggleHandler: PropTypes.func.isRequired,
        onlyIcons: PropTypes.bool.isRequired
    };
    protected drawer = (classes: any) => (
        <div>
            <Divider/>
            <List>{mailFolderListItems}</List>
            <Divider/>
            <List>{otherMailFolderListItems}</List>
        </div>
    )

    public constructor(props: IAbstractSidebarProps) {
        super(props);
    }
}