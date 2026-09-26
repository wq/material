import Box from "@mui/material/Box";
import { withWQ } from "@wq/react";
import PropTypes from "prop-types";

function Container({ children, sx }) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                ...sx,
            }}
        >
            {children}
        </Box>
    );
}
Container.propTypes = {
    children: PropTypes.node,
    sx: PropTypes.object,
};

export default withWQ(Container);
