import React from "react";
import { RadioButton as PaperRadioButton, useTheme } from "react-native-paper";
import PropTypes from "prop-types";
import { withWQ } from "@wq/react";

const STATUSES = {
    true: "checked",
    false: "unchecked",
    undefined: "unchecked",
    null: "unchecked",
};

function RadioButton({ checked, color, ...rest }) {
    const status = STATUSES[checked],
        theme = useTheme();
    if (color === "primary") {
        color = theme.colors.primary;
    } else if (color === "secondary") {
        color = theme.colors.accent;
    }
    return <PaperRadioButton status={status} {...rest} />;
}

RadioButton.propTypes = {
    checked: PropTypes.bool,
    color: PropTypes.string,
};

export default withWQ(RadioButton);
