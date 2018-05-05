import {Field, reduxForm} from "redux-form";
import {renderSelect, renderTextField} from "@comp/Inputs";
import * as React from "react";
import * as validator from "validator";
import transactionImage from "@/images/gain.png";
import {CURRENCIES} from "@/constants";

interface ITransactionFormProps {
    handleSubmit?: any;
    reset?: any;
    submitting?: any;

    [key: string]: any;
}


function validate(values: any) {
    const errors: any = {};
    const requiredFields = [
        "name",
        "currency",
        "value",
        "category"
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
    if (values.category) {
        if (!validator.isLength(values.category, {min: 3, max: 20})) {
            errors.category = "The category must contains [3,20] symbols";
        }
        if (!validator.matches(values.category, /^[\w\-\. ]+$/)) {
            errors.category = "The category must contain only digits, characters or '- _ .'";
        }
    }
    if (values.value && !Number(values.value)) {
        errors.value = "Value is not the number";
    }
    return errors;
}

const TransactionForm = (props: ITransactionFormProps) => {
    const {handleSubmit, reset, submitting} = props;
    return (
        <div className="has-text-centered">
            <div className="column is-6-desktop is-offset-3 is-offset-4-fullhd is-4-fullhd">
                <h3 className="title has-text-grey">TRANSACTION</h3>
                <p className="subtitle has-text-grey">add new</p>
                <div className="box">
                    <figure className="avatar">
                        <img src={transactionImage}/>
                    </figure>
                    <form onSubmit={handleSubmit} onReset={reset}>
                        <Field
                            name="name"
                            label="Name"
                            type="text"
                            component={renderTextField}
                        />
                        <Field
                            name="category"
                            label="Category"
                            type="text"
                            component={renderTextField}
                        />
                        <Field
                            name="value"
                            label="Value"
                            type="number"
                            component={renderTextField}
                        />
                        <Field
                            name="currency"
                            label="Currency"
                            component={renderSelect}
                        >
                            {
                                CURRENCIES.map((x: string, i: number) => {
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

const Component = reduxForm({form: "Create transaction", validate})(TransactionForm);
export default Component;