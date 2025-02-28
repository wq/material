import React from "react";
import { Tab as MuiTab } from "@mui/material";
import { useComponents, useIcon, withWQ } from "@wq/react";
import { NavLink } from "./Link.js";
import PropTypes from "prop-types";

const TabItemFallback = {
    components: {
        NavLink,
    },
};

export default function TabItem({ icon, to, children, ...rest }) {
    /* eslint no-unused-vars: off */
    const Icon = useIcon(icon),
        { NavLink } = useComponents();
    return (
        <MuiTab
            component={to && NavLink}
            icon={Icon && <Icon />}
            to={to}
            {...rest}
        />
    );
    // children rendered by TabGroup
}

TabItem.propTypes = {
    icon: PropTypes.string,
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    children: PropTypes.node,
};

export const Tab = withWQ(TabItem, { fallback: TabItemFallback });
