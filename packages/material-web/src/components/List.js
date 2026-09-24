import MuiList from "@mui/material/List";
import { withWQ } from "@wq/react";

function List(props) {
    return <MuiList sx={{ bgcolor: "background.paper" }} {...props} />;
}

export default withWQ(List);
