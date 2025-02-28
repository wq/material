import React from "react";
import { Drawer, AppBar, Toolbar, Typography } from "@mui/material";
import { useComponents, useConfig, withWQ } from "@wq/react";
import { NavMenu } from "./NavMenuFixed.js";
import { Logo } from "./Logo.js";

export function useSiteTitle() {
    return useConfig().site_title;
}

const NavMenuPopupFallback = {
    config: {
        site_title: "Project",
    },
    components: {
        NavMenu,
        Logo,
        useSiteTitle,
    },
};

function NavMenuPopup({ open, onClose }) {
    const { NavMenu, Logo, useSiteTitle } = useComponents(),
        title = useSiteTitle();
    return (
        <Drawer
            open={open}
            onClose={onClose}
            anchor="left"
            keepMounted
            PaperProps={{ style: { maxWidth: "80%", width: 500 } }}
        >
            <AppBar
                position="static"
                color="default"
                style={{ borderBottom: "1px solid #999" }}
            >
                <Toolbar variant="regular">
                    <Logo edge="start" />
                    <Typography variant="h6">{title}</Typography>
                </Toolbar>
            </AppBar>
            <NavMenu onNavigate={onClose} />
        </Drawer>
    );
}

export default withWQ(NavMenuPopup, {
    fallback: NavMenuPopupFallback,
});
