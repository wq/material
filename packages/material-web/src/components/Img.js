import React from "react";
import { withWQ } from "@wq/react";

function Img(props) {
    return <img {...props} />;
}

export default withWQ(Img);
