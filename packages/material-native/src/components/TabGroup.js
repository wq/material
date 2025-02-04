import React, { useState } from "react";
import { useWQ, withWQ } from "@wq/react";
import { View } from "react-native";
import { SegmentedButtons } from "react-native-paper";
import PropTypes from "prop-types";

function TabGroup({ children, style, ...rest }) {
    const tabs = React.Children.toArray(children),
        [value, setValue] = useState(tabs[0].props.value),
        activeTab = tabs.find((tab) => tab.props.value === value),
        handleChange = (tab) => setValue(tab),
        icons = useWQ("icons", true),
        buttons = tabs.map((tab) => ({
            value: tab.props.value,
            label: tab.props.label,
            icon: icons[tab.props.icon],
        }));

    return (
        <View style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <SegmentedButtons
                value={value}
                onValueChange={handleChange}
                buttons={buttons}
                style={{ padding: 8, ...style }}
                {...rest}
            />
            <View style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                {activeTab && activeTab.props.children}
            </View>
        </View>
    );
}

TabGroup.propTypes = {
    children: PropTypes.node,
    style: PropTypes.object,
};

export default withWQ(TabGroup);
