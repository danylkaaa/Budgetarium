import {IAuthState} from "@/models/State";
import {ActionTypes, AuthArgs} from "@/actions";
import {IActionArgs} from "@/actions/actionTypes";

const initialState: IAuthState = {
    accessToken: null,
    refreshToken: null,
    user: null,
};

const authSuccess = (state: IAuthState, action: AuthArgs.IAuthSuccessAction): IAuthState => {
    return {
        ...state,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        user: action.user,
    };
};
const authLogout = (state: IAuthState, action: AuthArgs.IAuthLogoutAction): IAuthState => {
    return {
        ...state,
        refreshToken: null,
        accessToken: null,
        user: null
    };
};

const authUpdateAccessToken = (state: IAuthState, action: AuthArgs.IAuthUpdateAccessTokenAction): IAuthState => {
    return {
        ...state,
        accessToken: action.accessToken
    };
};

const reducer = (state = initialState, action: IActionArgs) => {
    switch (action.type) {
        case ActionTypes.AUTH_SUCCESS:
            return authSuccess(state, action as AuthArgs.IAuthSuccessAction);
        case ActionTypes.AUTH_LOGOUT:
            return authLogout(state, action as AuthArgs.IAuthLogoutAction);
        case ActionTypes.AUTH_UPDATE_ACCESS_TOKEN:
            return authUpdateAccessToken(state, action as AuthArgs.IAuthUpdateAccessTokenAction);
        default:
            return state;
    }
};


export default reducer;