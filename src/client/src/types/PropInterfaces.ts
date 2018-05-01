import * as React from "react";
import * as PropTypes from "prop-types";
import {Theme} from "material-ui";

export interface IThemableProp<T> extends React.Props<T> {
    theme: Theme;
    classes: object;
}

export const themablePropTypes = {
    theme: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};