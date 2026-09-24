import React, { useState } from "react";
import Collapse from "@mui/material/Collapse";
import { useComponents, withWQ } from "@wq/react";
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
    // eslint-disable-next-line @eslint-react/no-children-to-array
    const [summary, ...details] = React.Children.toArray(children),
        [internalOpen, setInternalOpen] = useState(false),
        { ListItem, IconButton } = useComponents();

    let toggleOpen;
    if (open === false || open || onToggle) {
        toggleOpen = () => onToggle(!open);
    } else {
        open = internalOpen;
        toggleOpen = () => setInternalOpen(!internalOpen);
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
