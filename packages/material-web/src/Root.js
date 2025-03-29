import React, { useMemo } from "react";
import { withWQ } from "@wq/react";
import {
    createTheme as createMuiTheme,
    ThemeProvider,
    CssBaseline,
} from "@mui/material";
import * as components from "./components/index.js";
import { useMinWidth } from "./hooks.js";
import * as icons from "./icons.js";

const defaultTheme = {
    primary: "#7500ae",
    secondary: "#0088bd",
};

function Root({ children, theme }) {
    if (theme) {
        return <ThemeRoot theme={theme}>{children}</ThemeRoot>;
    } else {
        return children || null;
    }
}

function ThemeRoot({ children, theme }) {
    const muiTheme = useMemo(() => createTheme(theme), [theme]);
    return (
        <ThemeProvider theme={muiTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}

export default withWQ(Root, {
    defaults: {
        components: { ...components, useMinWidth },
        icons: {
            ...icons,
            List: icons.ListIcon,
            Menu: icons.MenuIcon,
        },
    },
});

function createTheme(theme) {
    if (theme === true) {
        theme = defaultTheme;
    }
    const { type, primary, secondary, background } = theme;
    const palette = theme.palette || {};
    if (type) {
        palette.mode = type;
    }
    if (primary) {
        palette.primary = { main: primary };
    }
    if (secondary) {
        palette.secondary = { main: secondary };
    }
    if (background) {
        palette.background = { paper: background };
    }
    return createMuiTheme({ palette });
}
