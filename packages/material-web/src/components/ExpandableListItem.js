import React, { useState } from "react";
import { useComponents, withWQ } from "@wq/react";
import { Collapse } from "@mui/material";
import ListItem from "./ListItem.js";
import IconButton from "./IconButton.js";
import PropTypes from "prop-types";

const ExpandableListItemFallback = {
    components: {
        ListItem,
        IconButton,
    },
};

function ExpandableListItem({ children, open, onToggle, ...rest }) {
    const [summary, ...details] = React.Children.toArray(children),
        [internalOpen, setOpen] = useState(false),
        { ListItem, IconButton } = useComponents();

    let toggleOpen;
    if (open === false || open || onToggle) {
        toggleOpen = () => onToggle(!open);
    } else {
        open = internalOpen;
        toggleOpen = () => setOpen(!open);
    }

    return (
        <>
            <ListItem
                button
                onClick={toggleOpen}
                secondaryAction={
                    <IconButton
                        icon={open ? "collapse" : "expand"}
                        onClick={toggleOpen}
                    />
                }
                {...rest}
            >
                {summary}
            </ListItem>
            <Collapse in={open} timeout="auto">
                {details}
            </Collapse>
        </>
    );
}

ExpandableListItem.propTypes = {
    children: PropTypes.node,
    open: PropTypes.bool,
    onToggle: PropTypes.func,
};

export default withWQ(ExpandableListItem, {
    fallback: ExpandableListItemFallback,
});
