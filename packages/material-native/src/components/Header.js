import React from "react";
import { Appbar } from "react-native-paper";
import { useComponents, withWQ, createFallbackComponent } from "@wq/react";
import { useNav } from "./Link.js";
import PropTypes from "prop-types";

const HeaderFallback = {
    components: {
        useNav,
        useBreadcrumbs: createFallbackComponent("useBreadcrumbs", "@wq/router"),
    },
};

function Header({ options, route }) {
    const { useNav, useBreadcrumbs } = useComponents();
    const title = options.title || route.name,
        breadcrumbs = useBreadcrumbs() || [],
        previous = breadcrumbs[breadcrumbs.length - 2],
        nav = useNav(previous?.url);
    return (
        <Appbar.Header>
            {previous && <Appbar.BackAction onPress={nav} />}
            <Appbar.Content title={title} />
        </Appbar.Header>
    );
}

Header.propTypes = {
    options: PropTypes.object,
    route: PropTypes.object,
};

export default withWQ(Header, { fallback: HeaderFallback });
