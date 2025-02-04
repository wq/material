import React from "react";
import { FAB } from "react-native-paper";
import { useComponents, useIcon, withWQ } from "@wq/react";
import { useNav } from "./Link.js";
import PropTypes from "prop-types";

const FabFallback = {
    components: {
        useNav,
    },
};

function Fab({ icon, to, ...rest }) {
    const { useNav } = useComponents();
    const onPress = useNav(to),
        Icon = useIcon(icon);

    return (
        <FAB
            onPress={onPress}
            icon={Icon}
            style={{
                position: "absolute",
                margin: 16,
                right: 0,
                bottom: 0,
            }}
            {...rest}
        />
    );
}

Fab.propTypes = {
    icon: PropTypes.string,
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default withWQ(Fab, { fallback: FabFallback });
