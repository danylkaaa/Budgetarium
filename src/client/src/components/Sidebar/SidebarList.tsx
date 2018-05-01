import * as React from "react";
import * as Icons from "@material-ui/icons";
import {ListItem, ListItemIcon, ListItemText, Theme} from "material-ui";
import InboxIcon from "@material-ui/icons/Inbox";

export const mailFolderListItems = (
    <div>
        <ListItem button={true}>
            <ListItemIcon>
                <Icons.Inbox/>
            </ListItemIcon>
            <ListItemText primary="Inbox"/>
        </ListItem>
        <ListItem button={true}>
            <ListItemIcon>
                <Icons.Star/>
            </ListItemIcon>
            <ListItemText primary="Starred"/>
        </ListItem>
        <ListItem button={true}>
            <ListItemIcon>
                <Icons.Send/>
            </ListItemIcon>
            <ListItemText primary="Send mail"/>
        </ListItem>
        <ListItem button={true}>
            <ListItemIcon>
                <Icons.Drafts/>
            </ListItemIcon>
            <ListItemText primary="Drafts"/>
        </ListItem>
    </div>
);

export const otherMailFolderListItems = (
    <div>
        <ListItem button={true}>
            <ListItemIcon>
                <Icons.Mail/>
            </ListItemIcon>
            <ListItemText primary="All mail"/>
        </ListItem>
        <ListItem button={true}>
            <ListItemIcon>
                <Icons.Delete/>
            </ListItemIcon>
            <ListItemText primary="Trash"/>
        </ListItem>
        <ListItem button={true}>
            <ListItemIcon>
                <Icons.Report/>
            </ListItemIcon>
            <ListItemText primary="Spam"/>
        </ListItem>
    </div>
);

export interface ISidebarItem {
    title: string;
    icon: React.ReactElement<any>;
    path: string | object;
    condition?: (theme: Theme) => boolean;
    hiddenOn?:object;
}


const sidebarItems: ISidebarItem[] = [
    {
        path: "/",
        title: "Home",
        icon: (
            <ListItemIcon>
                <Icons.Home/>
            </ListItemIcon>),
    },
    {
        path: "/login",
        title: "Login",
        icon: (<ListItemIcon><Icons.Face/></ListItemIcon>),
        hiddenOn:{mdDown:true}
    }
];


export default sidebarItems;