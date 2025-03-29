import React from "react";
import {
    ListItem as MuiListItem,
    ListItemButton,
    ListItemText,
    ListItemIcon,
} from "@mui/material";
import PropTypes from "prop-types";
import { useIcon, withWQ } from "@wq/react";

function ListItem({ children, description, icon, button, ...rest }) {
    const Icon = useIcon(icon),
        ListItem = button ? ListItemButton : MuiListItem;

    return (
        <ListItem {...rest}>
            {Icon && (
                <ListItemIcon>
                    <Icon />
                </ListItemIcon>
            )}
            <ListItemText primary={children} secondary={description} />
        </ListItem>
    );
}

ListItem.propTypes = {
    children: PropTypes.node,
    description: PropTypes.node,
    icon: PropTypes.string,
    button: PropTypes.bool,
};

export default withWQ(ListItem);
