import React from "react";
import { useComponents, useIcon, withWQ } from "@wq/react";
import ButtonLink from "./ButtonLink.js";
import PropTypes from "prop-types";

const HomeLinkFallback = {
    components: {
        ButtonLink,
    },
};

function HomeLink({ to, label, active, ...rest }) {
    const HomeIcon = useIcon("home") || (() => "Home"),
        { ButtonLink } = useComponents();
    return (
        <ButtonLink
            to={to}
            color={active ? "inherit" : "primary"}
            aria-label={label}
            {...rest}
        >
            <HomeIcon sx={{ verticalAlign: "middle" }} />
        </ButtonLink>
    );
}

HomeLink.propTypes = {
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    label: PropTypes.string,
    active: PropTypes.bool,
};

export default withWQ(HomeLink, { fallback: HomeLinkFallback });
