import * as React from "react";
import MainLayout from "@/hoc/MainLayout";

class Home extends React.Component<{}, {}> {
    public static propTypes = {};

    public constructor(props: any) {
        super(props);
        this.state = {};
    }

    public render() {
        return (
            <MainLayout>
                <h2>Home</h2>

            </MainLayout>
        );
    }
}

export default Home;