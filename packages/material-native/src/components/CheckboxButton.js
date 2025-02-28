import React from "react";
import { Checkbox, useTheme } from "react-native-paper";
import PropTypes from "prop-types";
import { withWQ } from "@wq/react";

const STATUSES = {
    true: "checked",
    false: "unchecked",
    undefined: "indeterminate",
    null: "indeterminate",
};

function CheckboxButton({ checked, color, ...props }) {
    const status = STATUSES[checked],
        theme = useTheme();
    if (color === "primary") {
        color = theme.colors.primary;
    } else if (color === "secondary") {
        color = theme.colors.accent;
    }
    return <Checkbox status={status} {...props} />;
}

CheckboxButton.propTypes = {
    checked: PropTypes.bool,
    color: PropTypes.string,
};

export default withWQ(CheckboxButton);
