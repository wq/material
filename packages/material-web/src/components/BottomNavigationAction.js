import React from "react";
import { BottomNavigationAction as MuiBottomNavigationAction } from "@mui/material";
import PropTypes from "prop-types";
import { useComponents, useIcon, withWQ } from "@wq/react";
import { NavLink } from "./Link.js";

const BottomNavigationActionFallback = {
    components: {
        NavLink,
    },
};

function BottomNavigationAction({ icon, to, ...rest }) {
    const Icon = useIcon(icon),
        { NavLink } = useComponents();
    return (
        <MuiBottomNavigationAction
            component={to && NavLink}
            icon={Icon && <Icon />}
            to={to}
            {...rest}
        />
    );
}

BottomNavigationAction.propTypes = {
    icon: PropTypes.string,
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default withWQ(BottomNavigationAction, {
    fallback: BottomNavigationActionFallback,
});
