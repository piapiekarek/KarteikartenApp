import React, {Component} from 'react';
import {MaterialIcon} from "./MaterialIcon";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

export class FolderButtonComponent extends Component {
    icons = [];

    constructor(props) {
        super(props);
        this.icons[true] = 'expand_more';
        this.icons[false] = 'chevron_right';
    }

    render() {
        let checked = false;
        if (this.props.withCheckboxes && this.props.folder.checked !== undefined) {
            checked = this.props.folder.checked;
        }
        return (
            <ListItem onClick={(e) => this.handleOnClick(e) } button>
                {this.props.withCheckboxes &&
                <Checkbox
                    checked={checked}
                    tabIndex={-1}
                    disableRipple
                />}
                <ListItemIcon>
                    <MaterialIcon icon={"folder"}/>
                </ListItemIcon>
                <ListItemText inset primary={this.props.folder.name}/>
                <span onClick={() => this.props.toggleOpenClose()}>{this.props.folder.childfolders &&
                <MaterialIcon icon={this.icons[this.props.folderOpen]}/>}</span>
            </ListItem>
        )
    };

    handleOnClick = (e) => {
        if(e.target.innerHTML !== 'chevron_right' && e.target.innerHTML !== 'expand_more') {
            this.props.currentFolderClick(this.props.folder, this.props.index)
        }
    }
}

