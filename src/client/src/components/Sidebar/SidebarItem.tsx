import * as React from "react";
import * as PropTypes from "prop-types";
import {IThemableProp, themablePropTypes} from "@/models/PropInterfaces";
import withStyles from "material-ui/styles/withStyles";
import {Link} from "react-router-dom";
import {Collapse, Divider, Hidden, List, ListItem, ListItemText, Theme} from "material-ui";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import * as classNames from "classnames";


export interface ISidebarLink {
    title?: string;
    icon?: React.ReactElement<any>;
    path?: string | object;
    divider?: boolean;
    shown?: boolean;
    hiddenOn?: object;
    children?: ISidebarLink[];
    action?: () => any;
}

interface ISidebarItemProps extends IThemableProp <SidebarItem> {
    link: ISidebarLink;
    subListLevel?: number;
}

interface ISidebarItemState {
    isOpen: boolean;
}

const styles = (theme: Theme) => ({
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    }
});

class SidebarItem extends React.Component<ISidebarItemProps, ISidebarItemState> {
    public static propTypes = {
        link: PropTypes.object.isRequired,
        ...themablePropTypes,
        subList: PropTypes.bool
    };

    public constructor(props: ISidebarItemProps) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    public isVisible = () => {
        return !("shown" in this.props.link) || this.props.link.shown;
    }


    protected container = (props: any): React.ReactElement<any> => {
        const {path}: any = this.props.link;
        if (path) {
            return (<Link to={path} {...props}/>);
        } else {
            return (<div {...props}/>);
        }
    }
    public collapse = (): void => {
        if (this.props.link.children ? this.collapse : null) {
            this.setState({
                ...this.state,
                isOpen: !this.state.isOpen
            });
        }
    }
    protected sublist = (): React.ReactElement<any> | null => {
        if (!this.props.link.children) {
            return null;
        }
        return (
            <Collapse in={this.state.isOpen} timeout="auto" unmountOnExit={true}>
                <List component="div" disablePadding={true}>
                    {
                        this.props.link.children.map((item: ISidebarLink, i: number) => {
                            return (
                                <SidebarItem
                                    link={item}
                                    subListLevel={this.props.subListLevel || 0 + 1}
                                    key={i}
                                    classes={this.props.classes}
                                    theme={this.props.theme}
                                />
                            );
                        })
                    }
                </List>
            </Collapse>
        );
    }
    private listPresentation = () => {
        const {link, classes, subListLevel}: any = this.props;
        const handler = link.action || this.collapse;
        const expandIcon = link.children ? this.state.isOpen ? <ExpandLess/> : <ExpandMore/> : null;
        return (
            <div>
                <ListItem
                    button={true}
                    component={this.container}
                    onClick={handler}
                    className={classNames(subListLevel && classes.nested)}>
                    {link.icon}
                    <ListItemText inset={true} primary={link.title}/>
                    {expandIcon}
                </ListItem>
                {this.sublist()}
            </div>);
    }

    public render() {
        if (!this.isVisible()) {
            return null;
        } else {
            return (
                <Hidden {...this.props.link.hiddenOn}>
                    {
                        this.props.link.divider ? <Divider/> : this.listPresentation()
                    }
                </Hidden>
            );
        }
    }
}

export default withStyles(styles as any, {withTheme: true})(SidebarItem);
