import React, { useMemo } from "react";
import { useConfig, withWQ } from "@wq/react";
import {
    createTheme as createMuiTheme,
    ThemeProvider,
    CssBaseline,
} from "@mui/material";
import * as components from "./components/index.js";
import * as icons from "./icons.js";

const defaultConfig = {
    material: {
        theme: {
            primary: "#7500ae",
            secondary: "#0088bd",
        },
    },
};

function Root({ children }) {
    const {
            material: { theme },
        } = useConfig(),
        muiTheme = useMemo(() => createTheme(theme), [theme]);
    return (
        <ThemeProvider theme={muiTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}

export default withWQ(Root, {
    defaults: {
        config: defaultConfig,
        components: { ...components },
        icons: {
            ...icons,
            List: icons.ListIcon,
        },
    },
});

function createTheme(theme) {
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
