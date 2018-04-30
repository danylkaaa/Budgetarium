import * as React from "react";
import * as PropTypes from "prop-types";
import {Link, withRouter, HashRouterProps} from "react-router-dom";
import {Toolbar, AppBar, IconButton, Typography, Button, Theme} from "material-ui";
import MenuIcon from "@material-ui/icons/Menu";
import "./index.scss";
import {DRAWER_WIDTH} from "@/constants";
import {withStyles} from "material-ui/styles";
import {IThemableProp, themablePropTypes} from "@/types/PropInterfaces";

interface IHeaderProps extends IThemableProp<CommonHeader> {
    handleChangeRequestNavDrawer: () => any;
    isSidebarOpen: boolean;
    theme: object;
    classes: object;
}

const styles =(theme :Theme)=> ({
    appBar: {
        position: "absolute",
        marginLeft: DRAWER_WIDTH,
        [theme.breakpoints.up("md")]: {
            width: `calc(100% - ${DRAWER_WIDTH}px)`,
        },
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
        handleChangeRequestNavDrawer: PropTypes.func.isRequired,
    };

    constructor(props: IHeaderProps) {
        super(props);
    }

    public render() {
        const {classes}: any = this.props;
        return (
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        onClick={this.props.handleChangeRequestNavDrawer}
                        color="inherit"
                        aria-label="open drawer"
                        className={classes.navIconHide}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="title" color="inherit" noWrap={true}>
                        Responsive drawer
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(styles as any, {withTheme: true})(CommonHeader);