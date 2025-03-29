import React, { useMemo } from "react";
import { withWQ } from "@wq/react";
import {
    MD2LightTheme,
    MD3LightTheme,
    MD2DarkTheme,
    MD3DarkTheme,
    Provider as PaperProvider,
} from "react-native-paper";
import * as components from "./components/index.js";
import { useMinWidth } from "./hooks.js";
import * as icons from "./icons.js";

const THEMES = {
    "light-2": MD2LightTheme,
    "light-3": MD3LightTheme,
    "dark-2": MD2DarkTheme,
    "dark-3": MD3DarkTheme,
};

const defaultTheme = {
    type: "light",
    version: 3,
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
    const paperTheme = useMemo(() => createTheme(theme), [theme]);
    return <PaperProvider theme={paperTheme}>{children}</PaperProvider>;
}

export default withWQ(Root, {
    defaults: {
        components: { ...components, useMinWidth },
        icons: { ...icons, List: icons.ListIcon, Menu: icons.MenuIcon },
    },
});

function createTheme(theme) {
    if (theme === true) {
        theme = defaultTheme;
    }
    const {
            type = "light",
            version = 3,
            primary,
            secondary,
            background,
        } = theme || {},
        colors = {},
        base = THEMES[`${type}-${version}`];
    if (!base) {
        console.warn(`Unknown base theme type=${type} version=${version}`);
    }
    if (primary) {
        colors.primary = primary;
    }
    if (secondary) {
        colors.accent = secondary;
    }
    if (background) {
        colors.background = background;
    }
    return {
        ...base,
        colors: {
            ...(base || {}).colors,
            ...colors,
        },
    };
}
