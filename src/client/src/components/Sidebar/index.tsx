import * as React from "react";
import * as PropTypes from "prop-types";
import {withStyles} from "material-ui/styles";
import {Divider, List, Hidden, Theme} from "material-ui";
import {IThemableProp, themablePropTypes} from "@/types/PropInterfaces";
import {DRAWER_WIDTH} from "@/constants";
import {mailFolderListItems, otherMailFolderListItems} from "@comp/Sidebar/SidebarList";
import {default as AbstractSidebar, IAbstractSidebarProps, styles} from "./AbstractSidebar";
import MobileSidebar from "./MobileSidebar";
import DesktopSidebar from "./DesktopSidebar";


class Sidebar extends AbstractSidebar {

    public constructor(props: IAbstractSidebarProps) {
        super(props);
    }

    public render() {
        const {isSidebarOpen, onlyIcons, iconsToggleHandler, openToggleHandler}: any = this.props;
        return (
            <div>
                <Hidden mdUp={true}>
                    <MobileSidebar
                        onlyIcons={onlyIcons}
                        iconsToggleHandler={iconsToggleHandler}
                        openToggleHandler={openToggleHandler}
                        isSidebarOpen={isSidebarOpen}/>
                </Hidden>
                < Hidden
                    smDown={true}
                    implementation="css">
                    <DesktopSidebar
                        onlyIcons={onlyIcons}
                        iconsToggleHandler={iconsToggleHandler}
                        openToggleHandler={openToggleHandler}
                        isSidebarOpen={isSidebarOpen}/>
                </Hidden>
            </div>
        );
    }
}

export default withStyles(styles as any, {withTheme: true})(Sidebar);