import * as React from "react";
import {IUser, IUserPayload} from "@/models/User";
import {IState} from "@/models/State";
import {connect} from "react-redux";
import * as Redux from "redux";
import {AuthActions} from "@/actions";

interface IExternalProps {
    [key: string]: any;
}

interface IStateInjectedProps {
    isAuthenticated: boolean;
    user: IUser | null;
    isLoadingAuth: boolean;
}

interface IDispatchInjectedProps {
    logout: () => any;
    login: (payload: IUserPayload) => any;
    register: (payload: IUserPayload) => any;
    reloadAccessToken: () => any;
}

type IInjectedProps = IStateInjectedProps & IDispatchInjectedProps;

export {IInjectedProps as IAuthorizationProps};

const mapStateToProps = (state: IState): IStateInjectedProps => {
    return {
        isLoadingAuth: Boolean(state.app.loaders.indexOf("auth") >= 0),
        isAuthenticated: Boolean(state.auth.user),
        user: state.auth.user,
    };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch<any, IState>): IDispatchInjectedProps => {
    return {
        logout: () => dispatch(new AuthActions.LogoutAction().execute()),
        login: (payload: IUserPayload) => dispatch(new AuthActions.LoginAction().execute(payload)),
        register: (payload: IUserPayload) => dispatch(new AuthActions.RegisterAction().execute(payload)),
        reloadAccessToken: () => dispatch(new AuthActions.RefreshAccessTokenAction().execute()),
    };
};

export default () =>
    <TOriginalProps extends {}>
    (
        Component:
            (React.ComponentClass<TOriginalProps & IInjectedProps>
                | React.StatelessComponent<TOriginalProps & IInjectedProps>)
    ) => {
        return connect<IStateInjectedProps, IDispatchInjectedProps, TOriginalProps>(mapStateToProps, mapDispatchToProps)(Component);
    };

