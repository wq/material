import React, { useMemo, useContext } from "react";
import { paramCase } from "param-case";

export const WQContext = React.createContext({
    fallback: {
        config: {},
        messages: {},
        components: {},
        icons: {},
    },
    defaults: {
        config: {},
        messages: {},
        components: {},
        icons: {},
    },
    overrides: {
        config: {},
        messages: {},
        components: {},
        icons: {},
    },
});

export function mergeWQContexts(context1, context2) {
    const context = {};
    for (const type of ["fallback", "defaults", "overrides"]) {
        context[type] = {};
        for (const key of ["config", "messages", "components", "icons"]) {
            const value1 = (context1[type] || {})[key] || {},
                value2 = (context2[type] || {})[key] || {};
            if (key === "config") {
                context[type][key] = {};
                for (const ckey in value1) {
                    context[type][key][ckey] = value1[ckey];
                    if (ckey in value2) {
                        if (
                            typeof value1[ckey] === "object" &&
                            typeof value2[ckey] === "object"
                        ) {
                            Object.assign(
                                context[type][key][ckey],
                                value2[ckey]
                            );
                        } else {
                            context[type][key][ckey] = value2[ckey];
                        }
                    }
                }
                for (const ckey in value2) {
                    if (!(ckey in value1)) {
                        context[type][key][ckey] = value2[ckey];
                    }
                }
            } else {
                context[type][key] = { ...value1, ...value2 };
            }
        }
    }
    return context;
}

export function useWQContext() {
    return useContext(WQContext);
}

export function useWQ(name, withParamCase = false) {
    const { fallback, defaults, overrides } = useWQContext();
    return useMemo(() => {
        const result = {
            ...fallback[name],
            ...defaults[name],
            ...overrides[name],
        };
        if (withParamCase) {
            Object.keys(result).forEach((key) => {
                result[paramCase(key)] = result[key];
            });
        }
        return result;
    }, [name, withParamCase, fallback, defaults, overrides]);
}

export function useConfig(name) {
    const config = useWQ("config");
    return name ? config[name] || {} : config;
}

export function useComponents() {
    return useWQ("components", true);
}

export function useIcon(icon) {
    const icons = useWQ("icons", true);
    if (typeof icon === "string") {
        if (icons[icon]) {
            return icons[icon];
        } else {
            return null;
        }
    } else if (typeof icon === "function") {
        return icon;
    } else {
        return null;
    }
}

export function useMessages() {
    return useWQ("messages");
}

export function useMessage(key) {
    const messages = useMessages();
    return messages[key] || key;
}

export function WQ({ wq: overrides, defaults, fallback, children }) {
    const curValue = useWQContext(),
        value = useMemo(
            () => mergeWQContexts(curValue, { overrides, defaults, fallback }),
            [curValue, overrides, defaults, fallback]
        );
    return <WQContext.Provider value={value}>{children}</WQContext.Provider>;
}

export function withWQ(Component, optionsOrName) {
    let name, defaults, fallback;
    if (typeof optionsOrName === "string") {
        name = optionsOrName;
    }
    if (typeof optionsOrName === "object") {
        name = optionsOrName.name;
        defaults = optionsOrName.defaults;
        fallback = optionsOrName.fallback;
    }
    if (!name) {
        name = Component.displayName || Component.name;
    }
    function WQComponent({ wq, ...props }) {
        if (wq || defaults || fallback) {
            return (
                <WQ wq={wq} defaults={defaults} fallback={fallback}>
                    <Component {...props} />
                </WQ>
            );
        } else {
            return <Component {...props} />;
        }
    }
    WQComponent.displayName = `${name}:wq`;
    return WQComponent;
}

export function createFallbackComponents(
    names,
    expectedModule,
    expectedComponent = "Root"
) {
    const fallback = {};
    for (const name of names) {
        fallback[name] = createFallbackComponent(
            name,
            expectedModule,
            expectedComponent
        );
    }
    return fallback;
}

export function createFallbackComponent(
    name,
    expectedModule,
    expectedComponent = "Root"
) {
    function Fallback() {
        console.warn(
            `Missing <${name}/>!  Try rendering within <${expectedComponent}/> from ${expectedModule}.`
        );
        return null;
    }
    Fallback.displayName = `${name}:fallback`;
    return Fallback;
}
