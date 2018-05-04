import * as React from "react";
import {IState} from "@/models/State";
import {connect} from "react-redux";
import {IUser} from "@/models/User";
import {Typography} from "material-ui";
import "./index.scss";

interface IStateProps {
    user: IUser | null;
    isAuthenticated: boolean;
}

type IUserInfoProps = IStateProps;

class UserInfo extends React.Component<IUserInfoProps> {
    public constructor(props: IUserInfoProps) {
        super(props);
    }

    public render() {
        const {user} = this.props;
        return user && (
            <article className="media UserInfo" style={{margin: "3px"}}>
                <figure className="media-left">
                    <p className="image is-64x64">
                        <img src={user.avatar}/>
                    </p>
                </figure>
                <div className="media-content name">
                    <div className="content ">
                        <Typography variant="headline">{user.name.split(/\s/)[0].substring(0, 7)}</Typography>
                    </div>
                </div>
            </article>
        );
    }
}


const mapStateToProps = (state: IState): IStateProps => {
    return {
        isAuthenticated: Boolean(state.auth.user),
        user: state.auth.user,
    };
};


export default connect<IStateProps>(mapStateToProps)(UserInfo);
