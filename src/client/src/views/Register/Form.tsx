import {Field, reduxForm} from "redux-form";
import {renderTextField} from "@comp/Inputs";
import * as React from "react";
import * as validator from "validator";

interface IRegisterFormProps {
    handleSubmit?: any;
    reset?: any;
    submitting?: any;
    [key:string]:any;
}

interface IRegisterFormFields {
    name:string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

function validate(values: IRegisterFormFields) {
    const errors: any = {};
    const requiredFields = [
        "email",
        "password",
        "name",
        "passwordConfirmation"
    ];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = "Required";
        }
    });
    // if (values.name && !/^([A-Z][A-Za-z]{1,20}?\s?)+$/.test(values.name)) {
    //     errors.name = "Name should contains only letters and start with uppercase letter";
    // }
    if (values.email && !validator.isEmail(values.email)) {
        errors.email = "Invalid email address";
    }
    if (values.password) {
        if (values.password !== values.passwordConfirmation) {
            errors.password = "Password doesn't match with confirmation";
        }
        // } else if (!/^(?=.*\d.*)(?=.*[a-z].*)(?=.*[A-Z].*)(?=.*[!#$%&?]*.*).{8,20}$/.test(values.password)) {
        //     errors.password = "Password must be minimum 8, and maximum 20 characters at least: 1 uppercase letter, 1 lowercase letter, 1 number";
        // }
    }
    if (values.passwordConfirmation) {
        if (values.password !== values.passwordConfirmation) {
            errors.passwordConfirmation = "Confirmation doesn't match the password";
        // } else if (!/^(?=.*\d.*)(?=.*[a-z].*)(?=.*[A-Z].*)(?=.*[!#$%&?]*.*).{8,20}$/.test(values.passwordConfirmation)) {
        //     errors.passwordConfirmation = "Password must be minimum 8, and maximum 20 characters at least: 1 uppercase letter, 1 lowercase letter, 1 number";
        }
    }
    return errors;
}

const RegisterForm = (props: IRegisterFormProps) => {
    const {handleSubmit, reset, submitting} = props;
    return (
        <form onSubmit={handleSubmit} onReset={reset}>
            <div>
                <Field
                    name="name"
                    label="Name"
                    icon="user"
                    type="text"
                    component={renderTextField}
                />
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
                <Field
                    name="passwordConfirmation"
                    label="Confirm password"
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

const Component = reduxForm({form: "RegisterForm", validate})(RegisterForm);
export default Component;