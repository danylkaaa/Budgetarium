import {IAuthState} from "@/models/State";
import {
    ActionTypes,
    IAuthFailAction,
    IAuthLogoutAction,
    IAuthRedirectPathAction,
    IAuthStartAction,
    IAuthSuccessAction
} from "@/actions";
import {IAction} from "@/actions/actionTypes";

const initialState: IAuthState = {
    accessToken: null,
    refreshToken: null,
    loading: false,
    error: null,
    authRedirectPath: "/",
    user: null,
};

const authStart = (state: IAuthState, action: IAuthStartAction): IAuthState => {
    return {
        ...state,
        error: null,
        loading: true
    };
};
const authSuccess = (state: IAuthState, action: IAuthSuccessAction): IAuthState => {
    return {
        ...state,
        error: null,
        loading: false
    };
};
const authFail = (state: IAuthState, action: IAuthFailAction): IAuthState => {
    return {
        ...state,
        error: action.error,
    };
};
const authLogout = (state: IAuthState, action: IAuthLogoutAction): IAuthState => {
    return {
        ...state,
        error: null,
        refreshToken: null,
        accessToken: null,
        user: null
    };
};
const setAuthRedirectPath = (state: IAuthState, action: IAuthRedirectPathAction): IAuthState => {
    return {
        ...state,
        authRedirectPath: action.path
    };
};
const reducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case ActionTypes.AUTH_START:
            return authStart(state, action as IAuthStartAction);
        case ActionTypes.AUTH_SUCCESS:
            return authSuccess(state, action as IAuthSuccessAction);
        case ActionTypes.AUTH_FAIL:
            return authFail(state, action as IAuthFailAction);
        case ActionTypes.AUTH_LOGOUT:
            return authLogout(state, action as IAuthLogoutAction);
        case ActionTypes.SET_AUTH_REDIRECT_PATH:
            return setAuthRedirectPath(state, action as IAuthRedirectPathAction);
        default:
            return state;
    }
};


export default reducer;