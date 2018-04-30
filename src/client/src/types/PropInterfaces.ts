import * as React from "react";
import * as PropTypes from "prop-types";

export interface IThemableProp<T> extends React.Props<T> {
    theme: object;
    classes: object;
}

export const themablePropTypes = {
    theme: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};