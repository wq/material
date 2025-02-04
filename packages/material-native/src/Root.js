import React, { useMemo } from "react";
import { useConfig, withWQ } from "@wq/react";
import {
    MD2LightTheme,
    MD3LightTheme,
    MD2DarkTheme,
    MD3DarkTheme,
    Provider as PaperProvider,
} from "react-native-paper";
import * as components from "./components/index.js";

const THEMES = {
    "light-2": MD2LightTheme,
    "light-3": MD3LightTheme,
    "dark-2": MD2DarkTheme,
    "dark-3": MD3DarkTheme,
};

const defaultConfig = {
    material: {
        theme: {
            primary: "#7500ae",
            secondary: "#0088bd",
        },
    },
};

function Root({ children }) {
    const { material: { theme: configTheme } = {} } = useConfig(),
        theme = useMemo(() => createTheme(configTheme), [configTheme]);
    return <PaperProvider theme={theme}>{children}</PaperProvider>;
}

export default withWQ(Root, {
    defaults: { config: defaultConfig, components: { ...components } },
});

function createTheme({
    type = "light",
    version = 3,
    primary,
    secondary,
    background,
}) {
    const colors = {},
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
