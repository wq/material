import React, { useState } from "react";
import {
    ScrollView,
    List,
    ExpandableListItem,
    ListSubheader,
    ListItemLink,
} from "@wq/material-web";
import { usePages } from "../hooks.js";

export default function NavMenu() {
    const sections = usePages();
    return (
        <ScrollView>
            <List>
                {sections.map(({ name, pages }) => (
                    <React.Fragment key={name}>
                        {name && <ListSubheader>{name}</ListSubheader>}
                        {pages.map((page) =>
                            page.pages ? (
                                <Folder key={page.url} {...page} />
                            ) : (
                                <ListItemLink
                                    key={page.url}
                                    to={page.url}
                                    icon={page.icon}
                                    activeClassName="Mui-selected"
                                >
                                    {page.title}
                                </ListItemLink>
                            ),
                        )}
                    </React.Fragment>
                ))}
            </List>
        </ScrollView>
    );
}

function Folder(page) {
    const [open, setOpen] = useState(
        window.location.pathname.startsWith(page.url),
    );
    return (
        <ExpandableListItem
            key={page.title}
            icon={page.icon}
            open={open}
            onToggle={setOpen}
        >
            {page.title}
            {page.pages.map((subpage) => (
                <ListItemLink
                    key={subpage.url}
                    to={subpage.url}
                    icon={subpage.icon}
                    activeClassName="Mui-selected"
                    sx={{ pl: 4 }}
                >
                    {subpage.title}
                </ListItemLink>
            ))}
        </ExpandableListItem>
    );
}
