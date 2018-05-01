import * as React from "react";
import * as PropTypes from "prop-types";
import * as classNames from "classnames";
import withWidth, {isWidthUp} from "material-ui/utils/withWidth";
import {AppBar, Button, IconButton, Theme, Toolbar, Typography} from "material-ui";
import MenuIcon from "@material-ui/icons/Menu";
import "./index.scss";
import {DRAWER_WIDTH} from "@/constants";
import {withStyles} from "material-ui/styles";
import {IThemableProp, themablePropTypes} from "@/models/PropInterfaces";
import {Breakpoint} from "material-ui/styles/createBreakpoints";
import {ChevronRight} from "@material-ui/icons";

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

    public render() {
        const {classes, onlyIcons}: any = this.props;
        return (
            <AppBar className={classNames(classes.appBar, !(!this.isDesktop() || onlyIcons) && classes.appBarShift)}>
                <Toolbar>
                    <IconButton
                        onClick={this.handleBurgerButtonClick}
                        color="inherit"
                        className={classNames(classes.menuButton, this.isDesktop() && !onlyIcons && classes.hide)}>
                        {this.isDesktop() ? <ChevronRight/> : <MenuIcon/>}
                    </IconButton>
                    <Typography variant="title" color="inherit" noWrap={true}>
                        Budgetarium
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withWidth()(withStyles(styles as any, {withTheme: true})(CommonHeader));