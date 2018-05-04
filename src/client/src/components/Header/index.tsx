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
import {connect} from "react-redux";
import {IState} from "@/models/State";
import * as Redux from "redux";
import {toggleSidebar} from "@/actions/appArgs";

export interface IOwnProps extends IThemableProp<CommonHeader> {
    isDesktop: boolean;
    title?: string;
    buttons?: IHeaderButtonProps[];
}

interface IStateProps {
    isSidebarOpen: boolean;
}

interface IDispatchProps {
    toggleSidebar: () => any;
}

type IHeaderProps = IDispatchProps & IStateProps & IOwnProps;
const styles = (theme: Theme) => ({
    appBar: {
        marginLeft: DRAWER_WIDTH,
        position: "fixed",
        overflow:"hidden",
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
        title: PropTypes.string,
        buttons: PropTypes.array,
        isDesktop: PropTypes.bool.isRequired,
    };

    constructor(props: IHeaderProps) {
        super(props);
    }

    private handleBurgerButtonClick = () => {
        this.props.toggleSidebar();
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
        const {classes, isSidebarOpen, title, isDesktop}: any = this.props;
        return (
            <AppBar className={classNames(classes.appBar, !(!isDesktop || isSidebarOpen) && classes.appBarShift)}>
                <Toolbar>
                    <IconButton
                        onClick={this.handleBurgerButtonClick}
                        color="inherit"
                        className={classNames(classes.menuButton, isDesktop && !isSidebarOpen && classes.hide)}>
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


const mapStateToProps = (state: IState): IStateProps => {
    return {
        isSidebarOpen: state.app.isSidebarOpen,
    };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch<any, IState>): IDispatchProps => {
        return {
            toggleSidebar: () => {
                console.log("header clicked");
                dispatch(toggleSidebar());
            }
        };
    }
;

let Component = withStyles(styles as any, {withTheme: true})(CommonHeader);
Component = connect<IStateProps, IDispatchProps, IOwnProps>(mapStateToProps, mapDispatchToProps)(Component);
export default Component;

