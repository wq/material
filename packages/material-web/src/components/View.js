import Box from "@mui/material/Box";
import { withWQ } from "@wq/react";

function View(props) {
    return <Box {...props} sx={{ position: "relative", ...props.sx }} />;
}

export default withWQ(View);
