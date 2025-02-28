import React, { useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useComponents, withWQ } from "@wq/react";
import { useMinWidth } from "../hooks.js";
import Logo from "./Logo.js";
import Breadcrumbs from "./Breadcrumbs.js";
import IconButton from "./IconButton.js";
import NavMenuPopup, { useSiteTitle } from "./NavMenuPopup.js";

const HeaderFallback = {
    config: {
        site_title: "Project",
    },
    components: {
        Logo,
        Breadcrumbs,
        IconButton,
        NavMenuPopup,
        useSiteTitle,
        useBreadcrumbs() {
            console.warn("Override useBreadcrumbs() to provide links");
            return [];
        },
    },
};

function Header() {
    const {
            Logo,
            Breadcrumbs,
            IconButton,
            NavMenuPopup,
            useSiteTitle,
            useBreadcrumbs,
        } = useComponents(),
        title = useSiteTitle(),
        links = useBreadcrumbs(),
        fixedMenu = useMinWidth(600),
        [open, setOpen] = useState(false);
    return (
        <>
            <AppBar position="static" sx={{ zIndex: 500 }}>
                <Toolbar>
                    {fixedMenu ? (
                        <Logo edge="start" />
                    ) : (
                        <IconButton
                            icon="menu"
                            sx={{ mr: 2 }}
                            onClick={() => setOpen(true)}
                            color="inherit"
                            edge="start"
                        />
                    )}
                    <Typography variant="h6">{title}</Typography>
                </Toolbar>
            </AppBar>
            <Breadcrumbs links={links} />
            {!fixedMenu && (
                <NavMenuPopup open={open} onClose={() => setOpen(false)} />
            )}
        </>
    );
}

export default withWQ(Header, { fallback: HeaderFallback });
