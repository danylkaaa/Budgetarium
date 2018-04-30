import * as React from "react";
import AppBar from "material-ui/AppBar";
import * as PropTypes from "prop-types";

// interface IHeaderState {
// }

interface IHeaderProps {
    styles?: object;
    handleChangeRequestNavDrawer?: () => any;
}

class Header extends React.Component<IHeaderProps, {}>{
    public static propTypes = {
        styles: PropTypes.object,
        handleChangeRequestNavDrawer: PropTypes.func.isRequired
    };
    public constructor(props: IHeaderProps) {
        super(props);
        this.state = {};
    }
    public render() {
        return (
            <div>
                <AppBar/>
            </div>
        );
    }
}

export default Header;