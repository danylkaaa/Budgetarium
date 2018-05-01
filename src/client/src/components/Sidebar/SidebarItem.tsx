import * as React from "react";
import {ISidebarLink} from "../../sidebar-links";
import * as PropTypes from "prop-types";
import {IThemableProp, themablePropTypes} from "@/types/PropInterfaces";
import withStyles from "material-ui/styles/withStyles";
import {Link} from "react-router-dom";
import {Collapse, Hidden, ListItem, List, ListItemText, Theme, Divider} from "material-ui";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import * as classNames from "classnames";

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
        return !this.props.link.condition || this.props.link.condition(this.props.theme);
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

    public render() {
        if (!this.isVisible()) {
            return null;
        }
        else if (this.props.link.divider) {
            return <Divider/>;
        } else {
            const {link, classes, subListLevel}: any = this.props;
            const expandIcon = link.children ? this.state.isOpen ? <ExpandLess/> : <ExpandMore/> : null;
            return (
                <Hidden {...link.hiddenOn}>
                    <div>
                        <ListItem
                            button={true}
                            component={this.container}
                            onClick={this.collapse}
                            className={classNames(subListLevel && classes.nested)}>
                            {link.icon}
                            <ListItemText inset={true} primary={link.title}/>
                            {expandIcon}
                        </ListItem>
                        {this.sublist()}
                    </div>
                </Hidden>
            );
        }
    }
}

export default withStyles(styles as any, {withTheme: true})(SidebarItem);
