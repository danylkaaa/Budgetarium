import * as React from "react";

export default class MainLayout extends React.Component<{}, {}>{
    public render() {
        return (
            <div>
                <div>Header</div>
                <div>
                    <h1>Main</h1>
                    {this.props.children}
                </div>
                <div>Footer</div>
            </div>
        );
    }
}