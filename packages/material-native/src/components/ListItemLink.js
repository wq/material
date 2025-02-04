import React from "react";
import { useComponents, withWQ } from "@wq/react";
import { useNav } from "./Link.js";
import ListItem from "./ListItem.js";
import PropTypes from "prop-types";

const ListItemLinkFallback = {
    components: {
        useNav,
        ListItem,
    },
};

function ListItemLink({ to, ...rest }) {
    const { useNav, ListItem } = useComponents(),
        onPress = useNav(to);
    return <ListItem onPress={onPress} {...rest} />;
}

ListItemLink.propTypes = {
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default withWQ(ListItemLink, { fallback: ListItemLinkFallback });
