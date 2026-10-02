import { useMemo } from "react";

export default function ExpoSnack({
    code,
    dependencies,
    name,
    description,
    height = 400,
}) {
    const url = useMemo(() => {
        let url = "https://snack.expo.dev/embedded?preview=true";
        url += "&platform=android&supportedPlatforms=mydevice,android,ios";
        url += "&code=" + encodeURIComponent(code);
        if (name) {
            url += "&name=" + encodeURIComponent(name);
        }
        if (description) {
            url += "&description=" + encodeURIComponent(description);
        }
        if (dependencies && Object.keys(dependencies).length > 0) {
            url +=
                "&dependencies=" +
                encodeURIComponent(
                    Object.entries(dependencies)
                        .map(([dep, version]) =>
                            version === "*" ? dep : `${dep}@${version}`,
                        )
                        .join(","),
                );
        }
        return url;
    }, [code, dependencies, name, description]);
    return (
        <iframe
            credentialless
            src={url}
            title={name}
            style={{
                height: height,
                width: "100%",
                border: "1px solid #ddd",
                borderRadius: 8,
            }}
        />
    );
}
