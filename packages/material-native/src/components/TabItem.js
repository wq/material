import React from "react";
import PropTypes from "prop-types";

export default function TabItem({ wq, value, icon, label, children }) {
    /* eslint no-unused-vars: off */

    // All rendering handled by TabGroup
    if (wq) {
        console.warn("wq prop has no effect in TabItem");
    }
    return null;
}

TabItem.propTypes = {
    wq: PropTypes.object,
    value: PropTypes.string,
    icon: PropTypes.string,
    label: PropTypes.string,
    children: PropTypes.node,
};
