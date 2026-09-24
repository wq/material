import MuiChip from "@mui/material/Chip";
import { useIcon, withWQ } from "@wq/react";
import PropTypes from "prop-types";

function Chip({ icon, ...rest }) {
    const Icon = useIcon(icon);
    return <MuiChip icon={Icon ? <Icon /> : null} {...rest} />;
}

Chip.propTypes = {
    icon: PropTypes.string,
};

export default withWQ(Chip);
