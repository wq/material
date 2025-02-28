import React from "react";
import { Drawer } from "@mui/material";
import { withWQ } from "@wq/react";
import PropTypes from "prop-types";

function Popup({ anchor = "bottom", children, open, onClose, ...rest }) {
    return (
        <Drawer anchor={anchor} open={open} onClose={onClose} {...rest}>
            {children}
        </Drawer>
    );
}

Popup.propTypes = {
    anchor: PropTypes.string,
    children: PropTypes.node,
    open: PropTypes.bool,
    onClose: PropTypes.func,
};

export default withWQ(Popup);
