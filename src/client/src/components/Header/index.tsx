import * as React from "react";
import * as PropTypes from "prop-types";
import * as classNames from "classnames";
import withWidth, {isWidthUp} from "material-ui/utils/withWidth";
import {Link, withRouter, HashRouterProps} from "react-router-dom";
import {Toolbar, AppBar, IconButton, Typography, Button, Theme} from "material-ui";
import MenuIcon from "@material-ui/icons/Menu";
import "./index.scss";
import {DRAWER_WIDTH} from "@/constants";
import {withStyles} from "material-ui/styles";
import {IThemableProp, themablePropTypes} from "@/types/PropInterfaces";
import {Breakpoint} from "material-ui/styles/createBreakpoints";

interface IHeaderProps extends IThemableProp<CommonHeader> {
    openToggleHandler: () => any;
    iconsToggleHandler: () => any;
    isSidebarOpen: boolean;
    onlyIcons: boolean;
    width: Breakpoint;
}

const styles = (theme: Theme) => ({
    appBar: {
        marginLeft: DRAWER_WIDTH,
        position: "absolute",
        [theme.breakpoints.up("md")]: {
            zIndex: theme.zIndex.drawer + 1,
            // width: `calc(100% - ${DRAWER_WIDTH}px)`,
            transition: theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },

    },
    appBarShift: {
        marginLeft: DRAWER_WIDTH,
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: "none",
    },
    navIconHide: {
        [theme.breakpoints.up("md")]: {
            display: "none",
        },
    },
});

class CommonHeader extends React.Component<IHeaderProps, {}> {
    public static propTypes = {
        ...themablePropTypes,
        isSidebarOpen: PropTypes.bool.isRequired,
        onlyIcons: PropTypes.bool.isRequired,
        iconsToggleHandler: PropTypes.func.isRequired,
        openToggleHandler: PropTypes.func.isRequired,
    };

    constructor(props: IHeaderProps) {
        super(props);
    }

    private handleBurgerButtonClick = () => {
        if (isWidthUp("md", this.props.width)) {
            this.props.iconsToggleHandler();
        } else {
            this.props.openToggleHandler();
        }
    }
    private isDesktop = () => {
        return isWidthUp("md", this.props.width);
    }
 // (this.isDesktop() && onlyIcons) || classes.appBarShift)
    public render() {
        const {classes, isSidebarOpen, onlyIcons}: any = this.props;
        return (
            <AppBar className={classNames(classes.appBar, !(!this.isDesktop()||onlyIcons) && classes.appBarShift)}>
                <Toolbar>
                    <IconButton
                        onClick={this.handleBurgerButtonClick}
                        color="inherit"
                        className={classNames(classes.menuButton, this.isDesktop() && !onlyIcons && classes.hide)}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="title" color="inherit" noWrap={true}>
                        Mini variant drawer
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withWidth()(withStyles(styles as any, {withTheme: true})(CommonHeader));