import { ScrollView, View } from "@wq/material-web";

export default function SnippetPreview({ children, height = 400 }) {
    return (
        <ScrollView
            sx={{
                p: 4,
                backgroundColor: "#f5f5f5",
                height: height,
                border: "1px solid #ddd",
                borderRadius: 2,
            }}
        >
            <View>{children}</View>
        </ScrollView>
    );
}
