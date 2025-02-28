import React from "react";
import { useComponents, withWQ } from "@wq/react";
import Typography from "./Typography.js";
import FooterContent from "./FooterContent.js";

const FooterFallback = {
    components: {
        Typography,
        FooterContent,
    },
};

function Footer() {
    const { Typography, FooterContent } = useComponents();

    return (
        <div
            style={{
                height: "3em",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
                borderTop: "1px solid rgba(0, 0, 0, 0.12)",
            }}
        >
            <Typography variant="caption" color="textSecondary">
                <FooterContent />
            </Typography>
        </div>
    );
}

export default withWQ(Footer, { fallback: FooterFallback });
