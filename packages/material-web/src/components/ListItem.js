import MuiListItem from "@mui/material/ListItem";
import MuiListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import PropTypes from "prop-types";
import { useIcon, withWQ } from "@wq/react";

function ListItemButton({
    children,
    secondaryAction,
    style,
    sx,
    className,
    divider,
    ...rest
}) {
    return (
        <MuiListItem
            disablePadding
            secondaryAction={secondaryAction}
            style={style}
            sx={sx}
            className={className}
            divider={divider}
        >
            <MuiListItemButton {...rest}>{children}</MuiListItemButton>
        </MuiListItem>
    );
}

function ListItem({
    children,
    description,
    icon,
    button,
    secondaryAction,
    ...rest
}) {
    const Icon = useIcon(icon),
        ListItem = button
            ? secondaryAction
                ? ListItemButton
                : MuiListItemButton
            : MuiListItem;

    return (
        <ListItem {...rest} secondaryAction={secondaryAction}>
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
    secondaryAction: PropTypes.node,
};

export default withWQ(ListItem);
