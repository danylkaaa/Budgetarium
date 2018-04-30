import * as React from "react";


import "./index.scss";

export default class CommonFooter extends React.Component<{}, {}> {
    constructor(props: any) {
        super(props);
    }

    public render() {

        return (
            <div style={{ textAlign: "center" }}>
                Footer
            </div>
        );
    }
}
