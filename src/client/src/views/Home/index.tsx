import * as React from "react";

class Home extends React.Component<{}, {}> {
    public static propTypes = {};

    public constructor(props: any) {
        super(props);
        this.state = {};
    }

    public render() {
        return (
            <h1>Home</h1>
        );
    }
}

export default Home;