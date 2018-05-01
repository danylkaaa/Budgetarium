import {IAuthState} from "@/models/State";

function initialState(): IAuthState {
    return {
        accessToken: null,
        refreshToken: null,
    };
}

const authReducer = (state: IAuthState = initialState(), action: any): IAuthState => {
    return state;
};

export default authReducer;