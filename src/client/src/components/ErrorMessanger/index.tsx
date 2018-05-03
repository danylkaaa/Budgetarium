import * as React from "react";
import {IError, IState} from "@/models/State";
import {connect} from "react-redux";
import * as Redux from "redux";
import {removeError} from "@/actions";
import * as _ from "lodash";
import Alert from "react-s-alert";

export interface IOwnProps extends React.Props<ErrorMessanger> {
    trigger: RegExp;
    stackLength: number;
}
interface IDispatchProps {
    removeError: (scope: IError) => any;
}
interface IStateProps {
    errors: IError[];
}

type IProps = IDispatchProps & IOwnProps & IStateProps;


class ErrorMessanger extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }

    public handleClose = (err: IError) => {
        return () => {
            this.props.removeError(err);
        };
    }

    public componentWillUpdate(nextProps: IProps) {
        const newErrors = _.difference(nextProps.errors,this.props.errors,);
        newErrors.forEach(error =>
            Alert.error(error.message, {
                position: "bottom-right",
                onClose: this.handleClose(error),
                effect: "slide",
                timeout: 6000
            }));
    }

    public render() {
        return (
            <div>
                <Alert stack={{limit: this.props.stackLength}}/>
                {this.props.children}
            </div>
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
        removeError: (err: IError) => dispatch(removeError(err))
    };
};


export default connect<IStateProps, IDispatchProps, IOwnProps>(mapStateToProps, mapDispatchToProps)(ErrorMessanger);
