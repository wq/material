import React from "react";
import { useIcon, withWQ } from "@wq/react";
import { IconButton as MuiIconButton } from "@mui/material";
import { Cancel } from "../icons.js";
import PropTypes from "prop-types";

function IconButton({ icon, size = "large", ...rest }) {
    const Icon = useIcon(icon) || Cancel;
    return (
        <MuiIconButton size={size} {...rest}>
            <Icon />
        </MuiIconButton>
    );
}

IconButton.propTypes = {
    icon: PropTypes.string,
    size: PropTypes.string,
};

export default withWQ(IconButton);
