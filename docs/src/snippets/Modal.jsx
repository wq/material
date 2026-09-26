import React, { useState } from "react";
import {
    Root,
    Button,
    MenuItem,
    Menu,
    Popup,
    SidePanel,
    Accordion,
} from "@wq/material";

export default function Modal() {
    const [menuAnchor, setMenuAnchor] = useState(null),
        [popupOpen, setPopupOpen] = useState(false);

    return (
        <Root>
            <Button onClick={(evt) => setMenuAnchor(evt.currentTarget)}>
                Open Menu
            </Button>
            <Button onClick={() => setPopupOpen(true)}>Open Popup</Button>

            <Menu
                open={Boolean(menuAnchor)}
                anchorEl={menuAnchor}
                onClose={() => setMenuAnchor(null)}
            >
                <MenuItem>Menu Item 1</MenuItem>
                <MenuItem>Menu Item 2</MenuItem>
                <MenuItem>Menu Item 3</MenuItem>
            </Menu>

            <Popup open={popupOpen} onClose={() => setPopupOpen(false)}>
                <div style={{ padding: "1rem" }}>Popup content</div>
            </Popup>

            <SidePanel anchor="top-right">
                <div style={{ padding: "1rem" }}>Side panel content</div>
            </SidePanel>

            <Accordion summary="Open Accordion">
                <div style={{ padding: "1rem" }}>Accordion content</div>
            </Accordion>
        </Root>
    );
}
