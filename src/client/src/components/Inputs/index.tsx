import * as React from "react";
import * as className from "classnames";
import * as FontAwesome from "react-fontawesome";

interface IInput {
    [key: string]: any;
}

function getStatusIcon(error: any, touched: boolean) {
    if (!touched) {
        return null;
    } else if (error) {
        return (<span className="icon is-small is-right"><FontAwesome name="exclamation-triangle"/></span>);
    } else {
        return (<span className="icon is-small is-right"><FontAwesome name="check"/></span>);
    }
}

function getFieldIcon(icon: any, error: any, touched: any) {
    const hasError = error && touched;
    const noError = !error && touched;
    if (icon) {
        return (
            <span className="icon is-small is-left">
                <FontAwesome name={icon}/>
            </span>);
    } else {
        return null;
    }
}

export const renderTextField = ({input, label, meta: {touched, error}, ...custom}: IInput) => {
    const hasError = error && touched;
    const noError = !error && touched;
    const rightIcon = getStatusIcon(error, touched);
    const leftIcon = getFieldIcon(custom.icon, error, touched);
    return (
        <div className="field">
            <label className="label">
                {label}
            </label>
            <div className={className("control has-icons-right", {"has-icons-left": custom.icon}, {"error": error})}>
                <input
                    className={className("input", {"is-danger": hasError}, {"is-success": noError})} type={custom.type}
                    placeholder={label} {...input}/>
                {leftIcon}
                {rightIcon}
            </div>
            {error &&
            <p className="help is-danger">{hasError ? error : null}</p>
            }
        </div>
    );
};