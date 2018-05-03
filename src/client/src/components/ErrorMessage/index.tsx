import * as React from "react";
import {IError, IState} from "@/models/State";
import {connect} from "react-redux";
import * as Redux from "redux";
import {removeError} from "@/actions";
import * as _ from "lodash";
import AlertTemplate from "react-alert-template-basic";
import AlertContainer, { AlertContainerProps, AlertShowOptions,withAlert } from "react-alert";

interface IOwnProps {
    trigger: RegExp;
}

interface IDispatchProps {
    removeError: (scope: string) => any;
}

interface IStateProps {
    errors: IError[];
}

type IWithMessagesProps = IDispatchProps & IOwnProps & IStateProps;

const options = {
    position: "bottom left",
    timeout: 5000,
    offset: "30px",
    transition: "scale"
}


class WithMessages extends React.Component<IWithMessagesProps, {}> {
    constructor(props: IWithMessagesProps) {
        super(props);
    }

    public handleClose = (scope: string) => {
        return () => {
            this.props.removeError(scope);
        };
    }

    render(): JSX.Element {
        return (
            <AlertProvider.Provider template={AlertTemplate}  {...options}>
                <Component {...this.props} {...this.state} />
            </AlertProvider.Provider>
        );
    }
}

const mapStateToProps = (state: IState, props: IOwnProps): IStateProps => {
    return {
        errors: _.filter(state.app.errors, (x: IError) => props.trigger.test(x.scope)),
    };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch<any, IState>): IDispatchProps => {
    return {
        removeError: (scope: string) => dispatch(removeError(scope))
    };
};

let Component = connect<IStateProps, IDispatchProps, IOwnProps>(mapStateToProps, mapDispatchToProps)(WithMessages);
Component = AlertProvider.withAlert(Component);
export default Component;