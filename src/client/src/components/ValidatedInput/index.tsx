import * as React from "react";
import {FormControl, FormHelperText, Input, InputLabel} from "material-ui";
import * as PropTypes from "prop-types";
import * as _ from "lodash";
import {Field} from "redux-form";

type IValidatorExecutor = (value: string) => boolean;

interface IValidator {
    validator: IValidatorExecutor;
    errorMessage?: any;
}

export interface IReduxFieldProps {
    onChange?: (value: any) => any;
}

export interface IField {
    name: string;
    label?: string;
    placeholder?: string;
    rules: IValidator[];
    type: string;
}

interface IValidatedInputState {
    value: string;
    error: string | null;
}


interface IValidatedInputProps extends IReduxFieldProps {
    field: IField;
    extraProps?: any;
}


class ValidatedInput extends React.Component<IValidatedInputProps, IValidatedInputState> {
    public static propTypes = {
        field: PropTypes.object.isRequired,
    };

    public constructor(props: IValidatedInputProps) {
        super(props);
        this.state = {
            error: null,
            value: ""
        };
    }

    private buildError = (value: string, builder: any) => {
        if (!builder) {
            return "Value is invalid";
        }
        if (typeof  builder === "string") {
            return builder;
        } else {
            return builder(value);
        }
    }
    public validate = (value: string) => {
        const failingRule = _.find(this.props.field.rules, (rule: IValidator) => !rule.validator(value));
        if (failingRule) {
            this.setState({
                ...this.state,
                error: this.buildError(value, failingRule.errorMessage)
            });
        } else {
            this.setState({
                ...this.state,
                error: null
            });
        }
    }

    public onChange = (event: any) => {
        this.setState({
            ...this.state,
            value: event.target.value
        });
        this.validate(event.target.value);
    }

    public buildField = () => {
        const {field} = this.props;
        return (
            <Input
                placeholder={field.placeholder}
                error={Boolean(this.state.error)}
                type={field.type}
                id={field.name}
            />
        );
    }

    public isValid = (): boolean => {
        return Boolean(this.state.error);
    }

    public render() {
        const {field} = this.props;
        const isInvalid = this.isValid();
        return (
            <FormControl error={isInvalid} {...this.props.extraProps}>
                <InputLabel htmlFor={field.name}>{field.label}</InputLabel>
                <Field component={this.buildField} name={field.name} onChange={this.props.onChange}/>
                <FormHelperText>{this.state.error}</FormHelperText>
            </FormControl>
        );
    }
}


export default ValidatedInput;