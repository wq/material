import { Snippet as BaseSnippet } from "@wq/gatsby-components";

const expo = {
        dependencies: {
            "@wq/material": "3.0.0-alpha.3",
            "@wq/material-native": "3.0.0-alpha.1",
            "@wq/react": "3.0.0-alpha.0",
            "react-native-paper": "*",
            "react-native-safe-area-context": "*",
        },
    },
    stackblitz = {
        dependencies: {
            "@emotion/react": "^11.14.0",
            "@emotion/styled": "^11.14.1",
            "@mui/icons-material": "^9.4.0",
            "@mui/material": "^9.4.0",
            "@wq/material": "^3.0.0-alpha.3",
            "@wq/material-web": "^3.0.0-alpha.2",
            "@wq/react": "^3.0.0-alpha.0",
        },
    };

export default function Snippet({ code, preview, name, description }) {
    return (
        <BaseSnippet
            code={code}
            preview={preview}
            expo={expo}
            stackblitz={stackblitz}
            name={name}
            description={description}
        />
    );
}
