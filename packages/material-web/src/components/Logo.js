import React from "react";
import { useConfig, useComponents, withWQ } from "@wq/react";
import Img from "./Img.js";

const LogoFallback = {
    components: {
        Img,
    },
    config: {
        logo: "/static/app/images/icon-192.png",
        site_title: "Project",
    },
};

function Logo({ edge, src, alt }) {
    const { logo, site_title } = useConfig(),
        { Img } = useComponents();

    if (!logo) {
        return null;
    }
    const style = { height: 64 };
    if (edge === "start") {
        style.marginLeft = -12;
        style.marginRight = 16;
    } else if (edge === "end") {
        style.marginLeft = 16;
        style.marginRight = -12;
    }
    return <Img src={src || logo} style={style} alt={alt || site_title} />;
}

export default withWQ(Logo, { fallback: LogoFallback });
