import * as React from "react";
import {withStyles} from "material-ui/styles";
import {Hidden} from "material-ui";
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
                        links={this.props.links}
                        onlyIcons={onlyIcons}
                        iconsToggleHandler={iconsToggleHandler}
                        openToggleHandler={openToggleHandler}
                        isSidebarOpen={isSidebarOpen}/>
                </Hidden>
                < Hidden
                    smDown={true}
                    implementation="css">
                    <DesktopSidebar
                        links={this.props.links}
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