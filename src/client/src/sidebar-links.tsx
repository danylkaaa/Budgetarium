import * as React from "react";
import * as Icons from "@material-ui/icons";
import {ListItemIcon, Theme} from "material-ui";


export interface ISidebarLink {
    title?: string;
    icon?: React.ReactElement<any>;
    path?: string | object;
    divider?: boolean;
    condition?: (theme: Theme) => boolean;
    hiddenOn?: object;
    children?: ISidebarLink[];
}


const sidebarItems: ISidebarLink[] = [
    {
        path: "/",
        title: "Home",
        icon: <ListItemIcon><Icons.Home/></ListItemIcon>,
    },
    {
        divider: true
    },
     {
        path: "/login",
        title: "Login",
        icon: <ListItemIcon><Icons.Person/></ListItemIcon>,
        hiddenOn: {xsDown: true}
    },
    {
        path: "/register",
        title: "Register",
        icon: <ListItemIcon><Icons.PersonAdd/></ListItemIcon>,
        hiddenOn: {xsDown: true}
    },
];


export default sidebarItems;