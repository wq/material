import { useState, useEffect, Fragment } from "react";
import { TabGroup, TabItem } from "@wq/material-web";
import {
    Web as Preview,
    PhoneAndroid as Expo,
    Bolt as Stackblitz,
    Code,
} from "@mui/icons-material";
import { useComponents, withWQ } from "@wq/react";
import SnippetPreview from "./SnippetPreview.js";
import SnippetExpo from "./SnippetExpo.js";
import SnippetStackblitz from "./SnippetStackblitz.js";
import SnippetCode from "./SnippetCode.js";

const SnippetDefaults = {
    components: {
        SnippetTab(props) {
            return <TabItem iconPosition="start" {...props} />;
        },
        SnippetPreview,
        SnippetExpo,
        SnippetStackblitz,
        SnippetCode,
        TabContainer: Fragment,
        TabContent: Fragment,
    },
    icons: { Preview, Expo, Stackblitz, Code },
};

function Snippet({
    preview,
    expo,
    stackblitz,
    code,
    name,
    description,
    height = 400,
}) {
    const [value, setValue] = useTabState("preview"),
        {
            SnippetPreview,
            SnippetExpo,
            SnippetStackblitz,
            SnippetCode,
            SnippetTab,
        } = useComponents();

    return (
        <TabGroup
            value={value}
            setValue={setValue}
            style={{ flex: 1 }}
            variant="scrollable"
            scrollButtons="auto"
        >
            {preview && (
                <SnippetTab
                    value="preview"
                    label="Web Preview"
                    icon="preview"
                    iconPosition="start"
                >
                    <SnippetPreview code={code} height={height}>
                        {preview}
                    </SnippetPreview>
                </SnippetTab>
            )}
            {expo && (
                <SnippetTab
                    value="expo"
                    label="Mobile (Expo)"
                    icon="expo"
                    iconPosition="start"
                >
                    <SnippetExpo
                        code={expo.code || code}
                        dependencies={expo.dependencies}
                        name={expo.name || name}
                        description={expo.description || description}
                        height={height}
                    />
                </SnippetTab>
            )}
            {stackblitz && (
                <SnippetTab
                    value="stackblitz"
                    label="Stackblitz"
                    icon="stackblitz"
                    iconPosition="start"
                >
                    <SnippetStackblitz
                        name={stackblitz.name || name}
                        description={stackblitz.description || description}
                        code={stackblitz.code || code}
                        dependencies={stackblitz.dependencies}
                        files={stackblitz.files}
                        height={height}
                    />
                </SnippetTab>
            )}
            {code && (
                <SnippetTab
                    value="code"
                    label="Code"
                    icon="code"
                    iconPosition="start"
                >
                    <SnippetCode code={code} name={name} height={height} />
                </SnippetTab>
            )}
        </TabGroup>
    );
}

function useTabState(defaultValue) {
    const [value, setValue] = useState(defaultValue);
    useEffect(() => {
        const storedValue = localStorage.getItem("snippetTab");
        let timeoutId;
        if (storedValue) {
            timeoutId = setTimeout(() => setValue(storedValue), 0);
        }
        return () => clearTimeout(timeoutId);
    }, []);
    const updateValue = (newValue) => {
        setValue(newValue);
        localStorage.setItem("snippetTab", newValue);
    };

    return [value, updateValue];
}

export default withWQ(Snippet, { defaults: SnippetDefaults });
