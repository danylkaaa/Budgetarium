import * as React from "react";
import * as PropTypes from "prop-types";
import {List, Theme,} from "material-ui";
import SidebarItem, {ISidebarLink} from "./SidebarItem";
import {IThemableProp, themablePropTypes} from "@/models/PropInterfaces";
import {DRAWER_WIDTH} from "@/constants";

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
    links: ISidebarLink[];
}

export default class AbstractSidebar extends React.Component<IAbstractSidebarProps, {}> {
    public static propTypes = {
        ...themablePropTypes,
        isSidebarOpen: PropTypes.bool.isRequired,
        openToggleHandler: PropTypes.func.isRequired,
        iconsToggleHandler: PropTypes.func.isRequired,
        onlyIcons: PropTypes.bool.isRequired,
        links: PropTypes.array.isRequired
    };
    protected buildDrawerList = (classes: any) => {
        const links = this.props.links;
        return (
            <div className={classes.root}>
                <List component="nav">
                    {
                        links.map((item: ISidebarLink, i: number) => {
                            return (<SidebarItem link={item} key={i}/>);
                        })
                    }
                </List>
            </div>
        );
    }

    public constructor(props: IAbstractSidebarProps) {
        super(props);
    }
}
