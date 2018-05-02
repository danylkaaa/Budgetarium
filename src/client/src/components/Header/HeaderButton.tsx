import * as React from "react";
import {Button} from "material-ui";

export interface IHeaderButtonProps {
    title?: string;
    icon?: React.ReactElement<any>;
    shown?: boolean;
    color?: "inherit" | "primary" | "secondary";
    action?: () => any;
}

class HeaderButton extends React.Component<IHeaderButtonProps, {}> {
    public isVisible = () => {
        return !("shown" in this.props) || this.props.shown;
    }

    public render() {
        const {color, title, icon, action} = this.props;
        if (this.isVisible()) {
            return null;
        }
        return (
            <Button color={color} onClick={action}>
                {title}
                {icon}
            </Button>
        );
    }
}

export default HeaderButton;