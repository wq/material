import React from "react";
import { useComponents, withWQ } from "@wq/react";
import ListItem from "./ListItem.js";
import { NavLink } from "./Link.js";

const ListItemLinkFallback = {
    components: {
        ListItem,
        NavLink,
    },
};

function ListItemLink(props) {
    const { ListItem, NavLink } = useComponents();
    return <ListItem button component={NavLink} {...props} />;
}

export default withWQ(ListItemLink, { fallback: ListItemLinkFallback });
