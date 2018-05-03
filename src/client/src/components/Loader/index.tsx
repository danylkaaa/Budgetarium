import * as React from "react";
import * as PropTypes from "prop-types";
import {LinearProgress} from "material-ui";

interface ILoaderProps {
    isLoading: boolean;
    color: "primary" | "secondary";
}

class Loader extends React.Component<ILoaderProps, {}> {
    public static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        color: PropTypes.string,
    };

    public render() {
        return (
            this.props.isLoading &&
            <LinearProgress
                color={this.props.color}
            />
        );
    }
}

export default Loader;