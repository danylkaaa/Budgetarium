import * as React from "react";
import {Button, MuiThemeProvider, Paper, TextField, Theme, Typography, withStyles} from "material-ui";
import ThemeDefault from "@/theme-default";
import {IThemableProp, themablePropTypes} from "@/models/PropInterfaces";
import {green, grey} from "material-ui/colors";
import {Person} from "@material-ui/icons";
import * as classNames from "classnames";
import * as FontAwesome from "react-fontawesome";
import {connect} from "react-redux";
import {IState} from "@/models/State";
import * as Redux from "redux";
import * as actions from "@/actions";
import * as _ from "lodash";

import {Redirect} from "react-router";

// own state
interface IRegisterState {
    email: string;
    password: string;
}

// own props
interface IOwnProps extends IThemableProp<Register> {

}

// props from dispatch
interface IDispatchProps {
    onConfirm: (email: string, password: string) => any;
}

// props from state
interface IStateProps {
    loading: boolean;
    isAuthenticated: boolean;
}

// final props
type IRegisterProps = IOwnProps & IDispatchProps & IStateProps;

const styles = (theme: Theme) => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
    },
    confirmBtn: {
        color: "white",
        float: "right",
        background: green[500],
        "&:hover": {
            background: green[600],
        }
    },
    loginContainer: {
        minWidth: 320,
        maxWidth: 400,
        height: "auto",
        position: "absolute",
        top: "20%",
        left: 0,
        right: 0,
        margin: "auto"
    },
    paper: {
        padding: 20,
        overflow: "auto"
    },
    buttonsDiv: {
        textAlign: "center",
        padding: 10
    },
    flatButton: {
        color: grey[500]
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    label: {
        color: grey[500]
    },
    btn: {
        color: grey[50],
        padding: 7,
        borderRadius: 2,
        margin: 2,
        fontSize: 13
    },
    btnFacebook: {
        background: "#4f81e9",
        "&:hover": {
            background: "#486fd0"
        }
    },
    btnGoogle: {
        background: "#e14441"
    },
    btnSpan: {
        marginLeft: 5
    },
});

class Register extends React.Component<IRegisterProps, IRegisterState> {
    public static propTypes = {
        ...themablePropTypes
    };

    public constructor(props: any) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }

    private handleConfirm = () => {
        this.props.onConfirm(this.state.email, this.state.password);
    }

    public render() {
        const {classes}: any = this.props;
        if (this.props.isAuthenticated) {
            return (<Redirect to="/"/>);
        }
        return (
            <MuiThemeProvider theme={ThemeDefault}>
                <div>
                    <div className={classes.loginContainer}>
                        <Paper className={classes.paper}>
                            <form>
                                <TextField
                                    helperText="Your email"
                                    label="E-mail"
                                    fullWidth={true}
                                />
                                <TextField
                                    label="Password"
                                    helperText="Your password"
                                    fullWidth={true}
                                    type="password"
                                />
                                <div>
                                    <Button
                                        variant="raised"
                                        color="primary"
                                        onClick={this.handleConfirm}
                                        className={classes.confirmBtn}>
                                        Confirm
                                    </Button>
                                </div>
                            </form>
                        </Paper>
                        <div className={classNames(classes.buttonsDiv)}>
                            <Typography variant="button" className={classes.label}>
                                Already have account?
                                <Button
                                    href="/login"
                                    className={classes.flatButton}>
                                    <Person className={classes.leftIcon}/>
                                    Login
                                </Button>
                            </Typography>
                        </div>
                        <div className={classes.buttonsDiv}>
                            <Button
                                color="primary"
                                variant="raised"
                                className={classNames(classes.btn, classes.btnFacebook)}>
                                Sign up with Facebook
                                <FontAwesome
                                    name="facebook"
                                    size="lg"
                                    className={classes.rightIcon}/>
                            </Button>
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = (state: IState) :IStateProps=> {
    return {
        loading: _.indexOf(state.loading.scopes, "auth") > -1,
        isAuthenticated: state.auth.user !== null
    };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch<any, IState>) :IDispatchProps=> {
    return {
        onConfirm: (email: string, password: string) => dispatch(actions.register({email, password})),
    };
};
export default connect<IStateProps, IDispatchProps, IRegisterProps>(mapStateToProps, mapDispatchToProps)(withStyles(styles as any, {withTheme: true})(Register));