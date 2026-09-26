import React from "react";
import {
    Root,
    Img,
    ScrollView,
    Skeleton,
    Text,
    Typography,
    View,
    HorizontalView,
    Grid,
} from "@wq/material";

export default function Content() {
    return (
        <Root>
            <ScrollView>
                <Img src="https://material.wq.io/images/@wq/material.svg" />
                <Skeleton />
                <Text>Test</Text>
                <Typography variant="h1">Heading 1</Typography>
                <View />
                <HorizontalView>
                    <Text>Text 1</Text>
                    <Text>Text 2</Text>
                </HorizontalView>
                <Grid />
            </ScrollView>
        </Root>
    );
}
