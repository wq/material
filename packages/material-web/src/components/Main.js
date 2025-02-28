import React from "react";
import { Box } from "@mui/material";
import { withWQ } from "@wq/react";
import PropTypes from "prop-types";

function Main({ children }) {
    return (
        <Box
            component="main"
            sx={{
                flex: "1",
                display: "flex",
                overflowY: "hidden",
            }}
        >
            {children}
        </Box>
    );
}

Main.propTypes = {
    children: PropTypes.node,
};

export default withWQ(Main);
