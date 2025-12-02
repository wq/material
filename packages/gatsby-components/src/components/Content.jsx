import React from "react";
import { ScrollView, View, List } from "@wq/material-web";
export default function Content({ children }) {
    return (
        <ScrollView>
            <View
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <List
                    component="div"
                    style={{
                        width: "100%",
                        maxWidth: 1000,
                        padding: "1em 2em",
                    }}
                >
                    {children}
                </List>
            </View>
        </ScrollView>
    );
}
