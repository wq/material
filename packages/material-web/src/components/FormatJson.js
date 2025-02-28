import React from "react";
import { withWQ } from "@wq/react";
import PropTypes from "prop-types";

function FormatJson({ json }) {
    return (
        <pre>
            <code>{JSON.stringify(json, null, 4)}</code>
        </pre>
    );
}

FormatJson.propTypes = {
    json: PropTypes.object,
};

export default withWQ(FormatJson);
