import React from "react";
import { useComponents, withWQ, createFallbackComponent } from "@wq/react";
import { Button } from "react-native";
import PropTypes from "prop-types";

export const useNav = createFallbackComponent("useNav", "@wq/router");

const LinkFallback = {
    components: {
        useNav,
    },
};

function Link({ to, children }) {
    const { useNav } = useComponents();
    const onPress = useNav(to);
    // FIXME: Use styled text instead?
    return <Button title={children} onPress={onPress} />;
}

Link.propTypes = {
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    children: PropTypes.node,
};

export default withWQ(Link, { fallback: LinkFallback });
