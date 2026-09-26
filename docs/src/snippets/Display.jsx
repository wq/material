import React from "react";
import {
    Root,
    Alert,
    Badge,
    Chip,
    CircularProgress,
    LinearProgress,
    FormatJson,
} from "@wq/material";

export default function Display() {
    return (
        <Root>
            <Alert severity="error">This is an error alert</Alert>
            <Alert severity="warning">This is a warning alert</Alert>
            <Alert severity="info">This is an info alert</Alert>
            <Alert severity="success">This is a success alert</Alert>

            <Badge badgeContent={4} color="primary">
                <Chip label="Notifications" />
            </Badge>

            <CircularProgress />
            <LinearProgress />

            <FormatJson json={{ name: "John", age: 30, city: "New York" }} />
        </Root>
    );
}
