import {Field, reduxForm} from "redux-form";
import {renderTextField} from "@comp/Inputs";
import * as React from "react";
import * as validator from "validator";

interface ILoginFormProps {
    handleSubmit?: any;
    reset?: any;
    submitting?: any;

    [key: string]: any;
}

interface ILoginFormFields {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

function validate(values: ILoginFormFields) {
    const errors: any = {};
    const requiredFields = [
        "email",
        "password",
    ];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = "Required";
        }
    });
    if (values.email && !validator.isEmail(values.email)) {
        errors.email = "Invalid email address";
    }
    // if (values.password && !/^(?=.*\d.*)(?=.*[a-z].*)(?=.*[A-Z].*)(?=.*[!#$%&?]*.*).{8,20}$/.test(values.password)) {
    //     errors.password = "Password must be minimum 8, and maximum 20 characters at least: 1 uppercase letter, 1 lowercase letter, 1 number";
    // }
    return errors;
}

const LoginForm = (props: ILoginFormProps) => {
    const {handleSubmit, reset, submitting} = props;
    return (
        <form onSubmit={handleSubmit} onReset={reset}>
            <div>
                <Field
                    name="email"
                    label="Email"
                    icon="envelope"
                    type="email"
                    component={renderTextField}
                />
                <Field
                    name="password"
                    label="Password"
                    icon="lock"
                    type="password"
                    component={renderTextField}
                />
                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-success" type="submit" disabled={submitting}>Submit</button>
                    </div>
                    <div className="control">
                        <button className="button is-danger" type="reset">Reset</button>
                    </div>
                </div>
            </div>
        </form>
    );
};

const Component = reduxForm({form: "LoginForm", validate})(LoginForm);
export default Component;