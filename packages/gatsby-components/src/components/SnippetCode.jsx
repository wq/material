import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { View, Button } from "@wq/material-web";
import { ContentCopy as Copy } from "@mui/icons-material";
import { withWQ } from "@wq/react";

const SnippetCodeDefaults = {
    icons: { Copy },
};

function SnippetCode({ code, name, height = 400 }) {
    const [copied, setCopied] = useState(false),
        copy = () => {
            navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        };
    return (
        <View
            sx={{
                overflow: "auto",
                position: "relative",
                height: height,
                border: "1px solid #ddd",
                borderRadius: 2,
                backgroundColor: "#fafafa",
            }}
        >
            <View
                sx={{
                    position: "sticky",
                    zIndex: 1000,
                    textAlign: "right",
                    top: 0,
                    mb: -9,
                    p: 2,
                }}
            >
                <Button
                    icon="copy"
                    onClick={copy}
                    variant="outlined"
                    color="secondary"
                    style={{
                        backgroundColor: "white",
                    }}
                >
                    {copied ? "Copied!" : "Copy"}
                </Button>
            </View>
            <SyntaxHighlighter language="jsx" style={materialLight}>
                {name ? `// ${name}\n\n${code}` : code}
            </SyntaxHighlighter>
        </View>
    );
}

export default withWQ(SnippetCode, { defaults: SnippetCodeDefaults });
