import React from "react";
import { Fab as MuiFab } from "@mui/material";
import { useComponents, useIcon, withWQ } from "@wq/react";
import { NavLink } from "./Link.js";
import PropTypes from "prop-types";

const FabFallback = {
    components: {
        NavLink,
    },
};

function Fab({ icon, to, ...rest }) {
    const Icon = useIcon(icon),
        { NavLink } = useComponents();
    return (
        <MuiFab
            component={NavLink}
            to={to}
            color="primary"
            style={{
                position: "absolute",
                right: 16,
                bottom: 16,
                zIndex: 5000,
            }}
            {...rest}
        >
            <Icon />
        </MuiFab>
    );
}

Fab.propTypes = {
    icon: PropTypes.string,
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default withWQ(Fab, { fallback: FabFallback });
