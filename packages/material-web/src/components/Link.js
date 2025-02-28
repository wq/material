import React from "react";
import { Link as MuiLink } from "@mui/material";
import { useComponents, withWQ, createFallbackComponent } from "@wq/react";

export const NavLink = createFallbackComponent("NavLink", "@wq/router"),
    useNav = createFallbackComponent("useNav", "@wq/router"),
    useReverse = createFallbackComponent("useReverse", "@wq/router"),
    useRouteInfo = createFallbackComponent("useRouteInfo", "@wq/router");

const LinkFallback = {
    components: {
        NavLink,
    },
};

function Link(props) {
    const { NavLink } = useComponents();
    return <MuiLink component={NavLink} {...props} />;
}

export default withWQ(Link, {
    fallback: LinkFallback,
});
