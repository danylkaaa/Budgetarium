import * as React from "react";
import * as PropTypes from "prop-types";
import {Divider, List, Hidden, Theme, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction} from "material-ui";
import {IThemableProp, themablePropTypes} from "@/types/PropInterfaces";
import {DRAWER_WIDTH} from "@/constants";
import {default as sidebarList, ISidebarItem} from "@comp/Sidebar/SidebarList";
import {Link} from "react-router-dom";


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
            {
                sidebarList.map((item: ISidebarItem, i: number) => {
                    if (!item.condition || item.condition(this.props.theme)) {
                        const link = (props: any) => <Link to={item.path} {...props}/>;
                        return (
                            <Hidden {...item.hiddenOn} key={i}>
                                <ListItem button={true}
                                          component={link}>
                                    {item.icon}
                                    <ListItemText primary={item.title}/>
                                </ListItem>
                            </Hidden>
                        );
                    } else {
                        return null;
                    }
                })
            }
        </div>
    )

    public constructor(props: IAbstractSidebarProps) {
        super(props);
    }
}
