import * as React from "react";

interface IRegisterState {
    email: string;
    password: string;
}

class Register extends React.Component<{}, IRegisterState> {
    public static propTypes = {};

    public constructor(props: any) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }

    public render() {
        return (
            <h1>Register</h1>
        );
    }
}

export default Register;