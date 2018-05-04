import * as React from "react";
import {default as withAuth, IAuthorizationProps} from "@hoc/withAuth";


interface IOptions {
    unauthorizedComponent?: React.ReactElement<any>;
}

type IInjectedProps = IAuthorizationProps;

export const withAuthGuard= (options?:IOptions) => <TOriginalProps extends {}>
(
    Component:
        (React.ComponentClass<TOriginalProps & IInjectedProps>
            | React.StatelessComponent<TOriginalProps & IInjectedProps>)
) => {
    type ResultProps = TOriginalProps & IInjectedProps;
    class AuthGuard extends React.Component<ResultProps> {
        public constructor(props: ResultProps) {
            super(props);
        }
        public render(){
            if(this.props.isAuthenticated){
                return <Component {...this.props} {...this.state}/>;
            }else{
                const placeholder=options?options.unauthorizedComponent:"NOT AUTHORIZED";
                return placeholder;
            }
        }
    }
    return withAuth()(AuthGuard);
};