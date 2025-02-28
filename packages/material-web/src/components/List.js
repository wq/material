import React from "react";
import { List as MuiList } from "@mui/material";
import { withWQ } from "@wq/react";

function List(props) {
    return <MuiList sx={{ bgcolor: "background.paper" }} {...props} />;
}

export default withWQ(List);
