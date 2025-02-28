import React from "react";
import { Box } from "@mui/material";
import { withWQ } from "@wq/react";
import PropTypes from "prop-types";

function ScrollView({ children, sx }) {
    return (
        <Box
            sx={{
                overflowX: "hidden",
                overflowY: "auto",
                flex: 1,
                ...sx,
            }}
        >
            {children}
        </Box>
    );
}

ScrollView.propTypes = {
    children: PropTypes.node,
    sx: PropTypes.object,
};

export default withWQ(ScrollView);
