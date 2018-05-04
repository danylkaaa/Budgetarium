import {Field, reduxForm} from "redux-form";
import {renderSelect, renderTextField} from "@comp/Inputs";
import * as React from "react";
import * as validator from "validator";
import walletImage from "@/images/wallet.png";
import {CURRENCIES} from "@/constants";

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
        "name",
        "currency"
    ];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = "Required";
        }
    });
    if (values.name) {
        if (!validator.isLength(values.name, {min: 3, max: 20})) {
            errors.name = "The name must contains [3,20] symbols";
        }
        if (!validator.matches(values.name, /^[\w\-\. ]+$/)) {
            errors.name = "The name must contain only digits, characters or '- _ .'";
        }
    }
    return errors;
}

const LoginForm = (props: ILoginFormProps) => {
    const {handleSubmit, reset, submitting} = props;
    return (
        <div className="has-text-centered">
            <div className="column is-4 is-offset-4">
                <h3 className="title has-text-grey">WALLET</h3>
                <p className="subtitle has-text-grey">add new</p>
                <div className="box">
                    <figure className="avatar">
                        <img src={walletImage}/>
                    </figure>
                    <form onSubmit={handleSubmit} onReset={reset}>
                        <Field
                            name="name"
                            label="Name"
                            type="text"
                            component={renderTextField}
                        />
                        <Field
                            name="currency"
                            label="Currency"
                            component={renderSelect}
                        >
                            {
                                CURRENCIES.map((x:string,i:number)=>{
                                    return (<option key={i}>{x}</option>);
                                })
                            }
                        </Field>
                        <button className="button is-block is-fullwidth is-success" type="submit"
                                disabled={submitting}>Submit
                        </button>
                        <br/>
                        <button className="button is-block is-danger is-fullwidth" type="reset">Reset</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const Component = reduxForm({form: "Create wallet", validate})(LoginForm);
export default Component;