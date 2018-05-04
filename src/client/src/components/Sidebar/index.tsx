import * as React from "react";
import {Hidden} from "material-ui";
import MobileSidebar from "./MobileSidebar";
import DesktopSidebar from "./DesktopSidebar";
import {connect} from "react-redux";
import {ISidebarLink} from "@comp/Sidebar/SidebarItem";
import {IThemableProp} from "@/models/PropInterfaces";
import {IState} from "@/models/State";
import * as Redux from "redux";
import {toggleSidebar} from "@/actions/app";

interface IOwnProps extends IThemableProp<Sidebar> {
    links: ISidebarLink[];
}

interface IDispatchProps {
    [key: string]: any;
}

interface IStateProps {
    [key: string]: any;
}

type ISidebarProps = IOwnProps & IDispatchProps & IStateProps;


class Sidebar extends React.Component<ISidebarProps> {
    public constructor(props: ISidebarProps) {
        super(props);
    }

    public render() {
        return (
            <div>
                <Hidden mdUp={true}>
                    <MobileSidebar
                        toggle={this.props.toggle}
                        isSidebarOpen={this.props.isSidebarOpen}
                        links={this.props.links}/>
                </Hidden>
                < Hidden
                    smDown={true}
                    implementation="css">
                    <DesktopSidebar
                        toggle={this.props.toggle}
                        isSidebarOpen={this.props.isSidebarOpen}
                        links={this.props.links}
                    />
                </Hidden>
            </div>
        );
    }
}

const mapStateToProps = (state: IState): IStateProps => {
    return {
        isSidebarOpen: !state.app.isSidebarOpen,
    };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch<any, IState>): IDispatchProps => {
    return {
        toggle: () => {
            console.log("sidebar toggle");
            dispatch(toggleSidebar());
        }
    };
};

const Component = connect<IStateProps, IDispatchProps, IOwnProps>(mapStateToProps, mapDispatchToProps)(Sidebar);
export default Component;