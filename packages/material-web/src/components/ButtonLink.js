import React from "react";
import { useComponents, withWQ } from "@wq/react";
import Button from "./Button.js";
import { NavLink } from "./Link.js";

const ButtonLinkFallback = {
    components: {
        Button,
        NavLink,
    },
};

function ButtonLink(props) {
    const { Button, NavLink } = useComponents();
    return <Button component={NavLink} {...props} />;
}

export default withWQ(ButtonLink, { fallback: ButtonLinkFallback });
