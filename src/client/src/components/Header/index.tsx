import * as React from "react";
import * as PropTypes from "prop-types";
import * as classNames from "classnames";
import {AppBar, IconButton, Theme, Toolbar, Typography} from "material-ui";
import MenuIcon from "@material-ui/icons/Menu";
import "./index.scss";
import {DRAWER_WIDTH} from "@/constants";
import {withStyles} from "material-ui/styles";
import {IThemableProp, themablePropTypes} from "@/models/PropInterfaces";
import {ChevronRight} from "@material-ui/icons";
import {default as HeaderButton, IHeaderButtonProps} from "@comp/Header/HeaderButton";

export interface IHeaderProps extends IThemableProp<CommonHeader> {
    openToggleHandler: () => any;
    iconsToggleHandler: () => any;
    isSidebarOpen: boolean;
    onlyIcons: boolean;
    isDesktop: boolean;
    title?: string;
    buttons?: IHeaderButtonProps[];
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
        title: PropTypes.string,
        buttons: PropTypes.array,
        isDesktop: PropTypes.bool.isRequired,
    };

    constructor(props: IHeaderProps) {
        super(props);
    }

    private handleBurgerButtonClick = () => {
        if (this.props.isDesktop) {
            this.props.iconsToggleHandler();
        } else {
            this.props.openToggleHandler();
        }
    }
    private headerButtons = () => {
        if (this.props.buttons) {
            return this.props.buttons.map((button, i: number) => (
                <HeaderButton {...button}/>));
        } else {
            return null;
        }
    }

    public render() {
        const {classes, onlyIcons, title, isDesktop}: any = this.props;
        return (
            <AppBar className={classNames(classes.appBar, !(!isDesktop || onlyIcons) && classes.appBarShift)}>
                <Toolbar>
                    <IconButton
                        onClick={this.handleBurgerButtonClick}
                        color="inherit"
                        className={classNames(classes.menuButton, isDesktop && !onlyIcons && classes.hide)}>
                        {isDesktop ? <ChevronRight/> : <MenuIcon/>}
                    </IconButton>
                    <Typography variant="title" color="inherit" noWrap={true}>
                        {title}
                    </Typography>
                    {this.headerButtons()}
                </Toolbar>
            </AppBar>
        );
    }
}


export default withStyles(styles as any, {withTheme: true})(CommonHeader);

