import React from "react";
import { useComponents, withWQ } from "@wq/react";
import { useNav } from "./Link.js";
import Button from "./Button.js";
import PropTypes from "prop-types";

const ButtonLinkFallback = {
    components: {
        useNav,
        Button,
    },
};

function ButtonLink({ to, children }) {
    const { useNav, Button } = useComponents();
    const onPress = useNav(to);
    return <Button onPress={onPress}>{children}</Button>;
}

ButtonLink.propTypes = {
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    children: PropTypes.node,
};

export default withWQ(ButtonLink, { fallback: ButtonLinkFallback });
