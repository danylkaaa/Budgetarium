import * as React from "react";
import * as PropTypes from "prop-types";
import {List, Theme,} from "material-ui";
import SidebarItem, {ISidebarLink} from "./SidebarItem";
import {IThemableProp, themablePropTypes} from "@/models/PropInterfaces";
import {DRAWER_WIDTH} from "@/constants";

export const styles = (theme: Theme) => ({
    toolbar: {
        ...theme.mixins.toolbar,
    },
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
    links: ISidebarLink[];
    isSidebarOpen: boolean;
    toggle:()=>any;
}


class AbstractSidebar extends React.Component<IAbstractSidebarProps, {}> {
    public static propTypes = {
        ...themablePropTypes,
        links: PropTypes.array.isRequired
    };

    public buildDrawerList = (classes: any) => {
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


export default AbstractSidebar;