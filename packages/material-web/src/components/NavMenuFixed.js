import React from "react";
import { createFallbackComponent, useComponents, withWQ } from "@wq/react";
import { useMinWidth } from "../hooks.js";
import { Paper } from "@mui/material";

export const NavMenu = createFallbackComponent("NavMenu", "@wq/router");

function useShowNavMenuFixed() {
    return useMinWidth(600);
}

const NavMenuFixedFallback = {
    components: {
        NavMenu,
        useShowNavMenuFixed,
    },
};

function NavMenuFixed() {
    const { NavMenu, useShowNavMenuFixed } = useComponents(),
        fixedMenu = useShowNavMenuFixed();
    if (!fixedMenu) {
        return null;
    }
    return (
        <Paper
            elevation={2}
            square
            sx={{
                minWidth: 180,
                width: "25%",
                maxWidth: 360,
                display: "flex",
                flexDirection: "column",
                zIndex: 600,
            }}
        >
            <NavMenu />
        </Paper>
    );
}

export default withWQ(NavMenuFixed, {
    fallback: NavMenuFixedFallback,
});
