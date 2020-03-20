import React, { useMemo, useCallback, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'redux-orm';
import {
    pathToAction,
    getOptions,
    selectLocationState
} from 'redux-first-router';
import { paramCase } from 'param-case';

const isAction = path => path && path.type;

export function useRoutesMap() {
    return useSelector(state => selectLocationState(state).routesMap);
}

export function useNav() {
    const dispatch = useDispatch(),
        routesMap = useRoutesMap(),
        { querySerializer } = getOptions();
    return useCallback(
        path => {
            const action = isAction(path)
                ? path
                : pathToAction('/' + path, routesMap, querySerializer);
            dispatch(action);
        },
        [dispatch, routesMap, querySerializer]
    );
}

export const RouteContext = React.createContext({
    name: '@@CURRENT'
});

function useCurrentRoute() {
    return useContext(RouteContext).name;
}

export function useRenderContext() {
    const context = useSelector(state => state.context),
        currentRoute = useCurrentRoute();
    return (context && context[currentRoute]) || {};
}

export function useRouteInfo() {
    const currentRoute = useCurrentRoute(),
        routeInfos = useSelector(state => state.routeInfo),
        routeInfo = routeInfos && routeInfos[currentRoute],
        context = useRenderContext(),
        { router_info: ctxRouteInfo } = context;
    if (routeInfo) {
        if (!ctxRouteInfo || ctxRouteInfo.full_path !== routeInfo.full_path) {
            return {
                ...routeInfo,
                pending: true
            };
        } else {
            return ctxRouteInfo;
        }
    } else {
        return { pending: true };
    }
}

export function useTitle() {
    const context = useRenderContext(),
        routeInfo = useRouteInfo();

    var title;
    if (routeInfo && !routeInfo.pending) {
        title = context.title || context.label;
    }

    if (!title && routeInfo) {
        if (routeInfo.mode === 'list') {
            title = routeInfo.page_config.url;
        } else if (routeInfo.variant === 'new') {
            title = `New ${routeInfo.page}`;
        } else {
            title = routeInfo.page;
        }
    }

    if (!title) {
        title = 'Loading...';
    }

    return title;
}

export function useReverse() {
    const location = useSelector(selectLocationState);
    return useCallback(
        (name, payload, query) => {
            const action = {
                type: name.toUpperCase()
            };
            if (!location.routesMap[action.type]) {
                throw new Error(`Unknown route: ${action.type}`);
            }
            if (payload) {
                if (typeof payload === 'object') {
                    action.payload = payload;
                } else {
                    action.payload = { slug: payload };
                }
            }
            if (query) {
                action.meta = { query };
            }
            return action;
        },
        [location]
    );
}

export function useIndexRoute() {
    // FIXME: This should be read from the configuration
    return 'index';
}

export function useBreadcrumbs() {
    const title = useTitle(),
        {
            name,
            page,
            page_config,
            item_id,
            mode,
            full_path,
            parent_id,
            parent_label,
            parent_conf
        } = useRouteInfo(),
        reverse = useReverse(),
        index = useIndexRoute();

    if (name === index) {
        return null;
    }

    const links = [],
        addLink = (url, label) => links.push({ url, label }),
        addCurrentPage = label => addLink(full_path, label);

    addLink(reverse(index), 'Home');

    if (parent_id && parent_conf) {
        addLink(reverse(`${parent_conf.page}_list`), parent_conf.url);
        addLink(reverse(`${parent_conf.page}_detail`, parent_id), parent_label);
    }

    if (item_id) {
        addLink(reverse(`${page}_list`), page_config.url);
        if (mode !== 'detail') {
            addLink(reverse(`${page}_detail`, item_id), title);
            addCurrentPage(mode);
        } else {
            addCurrentPage(title);
        }
    } else {
        addCurrentPage(title);
    }

    return links;
}

export function useSpinner() {
    const spinner = useSelector(state => state.spinner);
    return spinner;
}

export const AppContext = React.createContext({
    app: {
        plugins: {},
        models: {}
    }
});

export function useComponents() {
    return usePluginComponentMap('react', 'components');
}

export function useInputComponents() {
    return usePluginComponentMap('react', 'inputs');
}

export function useViewComponents() {
    return usePluginComponentMap('react', 'views');
}

export function useApp() {
    return useContext(AppContext).app;
}

export function useModel(name, filter) {
    const app = useApp(),
        model = app.models[name];

    if (!model) {
        throw new Error(`Unknown model name ${name}`);
    }

    let selector;
    if (
        typeof filter === 'function' ||
        (typeof filter === 'object' && !Array.isArray(filter))
    ) {
        selector = createSelector(
            model.orm,
            session => session[name].filter(filter).toRefArray()
        );
    } else {
        selector = state => createSelector(model.orm[name])(state, filter);
    }

    return useSelector(selector);
}

export function usePlugin(name) {
    const { plugins } = useApp();
    return plugins[name];
}

export function usePluginComponentMap(pluginName, mapName) {
    const plugin = usePlugin(pluginName) || {},
        { config = {} } = plugin,
        { [mapName]: componentMap = {} } = config;
    Object.entries(componentMap).forEach(([key, val]) => {
        componentMap[paramCase(key)] = val;
    });
    return componentMap;
}

export function usePluginState(name) {
    const plugin = usePlugin(name),
        pluginState = useSelector(state => state[name]);

    if (plugin) {
        return pluginState;
    } else {
        return null;
    }
}

export function usePluginContent() {
    const app = useApp(),
        components = useComponents(),
        routeInfo = useRouteInfo();

    const content = useMemo(
        () =>
            app
                .callPlugins('runComponent', [routeInfo])
                .map(name => (name ? components[name] : null))
                .filter(component => !!component),
        [routeInfo]
    );

    return useCallback(
        function PluginContent() {
            if (!content.length) {
                return null;
            } else {
                return (
                    <>
                        {content.map((Component, i) => (
                            <Component key={i} />
                        ))}
                    </>
                );
            }
        },
        [content]
    );
}

export function getTitle(routeName) {
    return routeName.toLowerCase().replace('_', ' ');
}
