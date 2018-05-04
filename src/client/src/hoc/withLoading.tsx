import * as React from "react";
import {IState} from "@/models/State";
import {connect} from "react-redux";
import * as Redux from "redux";
import {endLoading, startLoading} from "@/actions/appArgs";

interface IExternalProps {
    [key: string]: any;
}

interface IStateInjectedProps {
    isLoading: (scope: string) => boolean;
}

interface IDispatchInjectedProps {
    startLoading: (scope: string) => any;
    endLoading: (scope: string) => any;
}

type IInjectedProps = IStateInjectedProps & IDispatchInjectedProps;

export {IInjectedProps as ILoadingProps};

const mapStateToProps = (state: IState): IStateInjectedProps => {
    return {
        isLoading: (scope) => state.app.loaders.indexOf(scope) >= 0,
    };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch<any, IState>): IDispatchInjectedProps => {
    return {
        startLoading: (scope) => dispatch(startLoading(scope)),
        endLoading: (scope) => dispatch(endLoading(scope))
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

