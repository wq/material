import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import { withWQ, useComponents } from "@wq/react";

const TabGroupFallback = {
    components: {
        TabContainer(props) {
            return (
                <Box
                    {...props}
                    sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                        ...props.sx,
                    }}
                />
            );
        },
        TabContent(props) {
            return (
                <Box
                    {...props}
                    sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                        ...props.sx,
                    }}
                />
            );
        },
    },
};

function TabGroup(props) {
    if (props.value || props.setValue) {
        return <ControlledTabGroup {...props} />;
    } else {
        return <UncontrolledTabGroup {...props} />;
    }
}

export default withWQ(TabGroup, { fallback: TabGroupFallback });

function UncontrolledTabGroup({ children, ...rest }) {
    // eslint-disable-next-line @eslint-react/no-children-to-array
    const tabs = React.Children.toArray(children),
        [value, setValue] = useState(tabs[0].props.value);
    return (
        <ControlledTabGroup value={value} setValue={setValue} {...rest}>
            {children}
        </ControlledTabGroup>
    );
}

function ControlledTabGroup({ children, value, setValue, ...rest }) {
    // eslint-disable-next-line @eslint-react/no-children-to-array
    const tabs = React.Children.toArray(children),
        activeTab = tabs.find((tab) => tab.props.value === value),
        handleChange = (evt, tab) => setValue(tab),
        { TabContainer, TabContent } = useComponents();

    return (
        <TabContainer>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                {...rest}
            >
                {tabs}
            </Tabs>
            <TabContent>{activeTab && activeTab.props.children}</TabContent>
        </TabContainer>
    );
}
