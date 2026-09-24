import Box from "@mui/material/Box";
import { withWQ } from "@wq/react";
import PropTypes from "prop-types";

function Container({ children }) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
            }}
        >
            {children}
        </Box>
    );
}
Container.propTypes = {
    children: PropTypes.node,
};

export default withWQ(Container);
