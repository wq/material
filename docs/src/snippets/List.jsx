import {
    Root,
    ListSubheader,
    List,
    ListItem,
    ListItemLink,
    Divider,
    ExpandableListItem,
    Chip,
} from "@wq/material";

const NavLink = ({ to, children, ...rest }) => (
    <a href={to} target="_blank" {...rest}>
        {children}
    </a>
);

export default function App() {
    return (
        <Root wq={{ components: { NavLink } }}>
            <List>
                <ListSubheader>Header</ListSubheader>
                <ListItem
                    icon="success"
                    button
                    description="Click Me"
                    onClick={() => alert("Clicked!")}
                >
                    Item 1
                </ListItem>
                <ListItem icon="pending">Item 2</ListItem>
                <ListItem secondaryAction={<Chip label="Chip" />}>
                    Item 3
                </ListItem>
                <Divider />
                <ExpandableListItem icon="info" description="Click to expand">
                    Expandable List Item
                    <List>
                        <ListItem>Subitem 1</ListItem>
                        <ListItem>Subitem 2</ListItem>
                    </List>
                </ExpandableListItem>
                <ListItemLink to="/test" icon="external">
                    Link
                </ListItemLink>
            </List>
        </Root>
    );
}
