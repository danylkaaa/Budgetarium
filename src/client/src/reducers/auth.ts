import {IAuthState} from "@/models/State";
import {ActionTypes, IAuthFailAction, IAuthLogoutAction, IAuthSuccessAction} from "@/actions";
import {IAction} from "@/actions/actionTypes";

const initialState: IAuthState = {
    accessToken: null,
    refreshToken: null,
    user: null,
};

const authSuccess = (state: IAuthState, action: IAuthSuccessAction): IAuthState => {
    return {
        ...state,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        user: action.user,
    };
};
const authFail = (state: IAuthState, action: IAuthFailAction): IAuthState => {
    return {
        ...state,
    };
};
const authLogout = (state: IAuthState, action: IAuthLogoutAction): IAuthState => {
    return {
        ...state,
        refreshToken: null,
        accessToken: null,
        user: null
    };
};
const reducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case ActionTypes.AUTH_SUCCESS:
            return authSuccess(state, action as IAuthSuccessAction);
        case ActionTypes.AUTH_FAIL:
            return authFail(state, action as IAuthFailAction);
        case ActionTypes.AUTH_LOGOUT:
            return authLogout(state, action as IAuthLogoutAction);
        default:
            return state;
    }
};


export default reducer;