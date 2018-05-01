import * as React from "react";
import * as PropTypes from "prop-types";
import {
    Divider,
    List,
    Hidden,
    Theme,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemSecondaryAction,
    Collapse
} from "material-ui";
import SidebarItem from "./SidebarItem";
import {IThemableProp, themablePropTypes} from "@/types/PropInterfaces";
import {DRAWER_WIDTH} from "@/constants";
import {default as sidebarList, ISidebarLink} from "@comp/Sidebar/SidebarList";
import {Link} from "react-router-dom";
import withStyles from "material-ui/styles/withStyles";


export const styles = (theme: Theme) => ({
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: DRAWER_WIDTH,
        [theme.breakpoints.up("md")]: {
            position: "relative",
        },
    },
    root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
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
    protected buildDrawerList = (classes: any) => (
        <div className={classes.root}>
            <List component="nav">
                {
                    sidebarList.map((item: ISidebarLink, i: number) => {
                        return (<SidebarItem link={item} key={i}/>);
                    })
                }
            </List>
        </div>
    )

    public constructor(props: IAbstractSidebarProps) {
        super(props);
    }
}
