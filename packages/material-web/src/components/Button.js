import MuiButton from "@mui/material/Button";
import { useIcon, withWQ } from "@wq/react";
import PropTypes from "prop-types";

function Button({ icon, ...rest }) {
    const Icon = useIcon(icon),
        startIcon = Icon ? <Icon /> : null;
    return <MuiButton startIcon={startIcon} {...rest} />;
}

Button.propTypes = {
    icon: PropTypes.string,
};

export default withWQ(Button);
