import React from "react";
import { useComponents, withWQ } from "@wq/react";
import Link from "./Link.js";

const FooterContentFallback = {
    components: {
        Link,
    },
};

function FooterContent() {
    const { Link } = useComponents();
    return (
        <>
            Powered by{" "}
            <Link component="a" href="https://wq.io/" target="_blank">
                wq
            </Link>
        </>
    );
}

export default withWQ(FooterContent, { fallback: FooterContentFallback });
