import React, { useState, createContext, use } from "react";
import {
    Root,
    Container,
    Header,
    Main,
    Footer,
    NavMenuFixed,
    ListItemLink,
    List,
    BottomNavigation,
    BottomNavigationAction,
} from "@wq/material";

const wq = {
    config: {
        site_title: "wq Layout Example",
        logo: "https://material.wq.io/images/icons/wq.svg",
    },
    components: { NavLink: Link, NavMenu, FooterContent, useBreadcrumbs },
};

const theme = {
    primary: "#0088bd",
    secondary: "#7500ae",
};

export default function Layout() {
    return (
        <RouterProvider>
            <Root wq={wq} theme={theme}>
                <Container sx={{ height: "320px" /* for demo */ }}>
                    <Header />
                    <Main>
                        <NavMenuFixed />
                        <Content />
                    </Main>
                    <Footer />
                </Container>
            </Root>
        </RouterProvider>
    );
}

const NavContext = createContext({});

/* Stub for e.g. React Router */
function RouterProvider({ children }) {
    const [page, setPage] = useState("/");
    return <NavContext value={{ page, setPage }}>{children}</NavContext>;
}

function Link({ to, children, ...props }) {
    const { page, setPage } = use(NavContext);
    return (
        <div
            {...props}
            onClick={() => setPage(to || "/")}
            className={
                page === to
                    ? `${props.className} Mui-selected`
                    : props.className
            }
        >
            {children}
        </div>
    );
}

function NavMenu() {
    return (
        <List component="nav">
            <ListItemLink to="/">Home</ListItemLink>
            <ListItemLink to="/about">About</ListItemLink>
            <ListItemLink to="/contact">Contact</ListItemLink>
        </List>
    );
}

function useBreadcrumbs() {
    const { page } = use(NavContext);
    if (!page || page === "/") {
        return [];
    } else {
        return [
            { label: "Home", url: "/" },
            { label: page.slice(1), url: page },
        ];
    }
}

function FooterContent() {
    return (
        <BottomNavigation style={{ width: "100%" }} showLabels>
            <BottomNavigationAction label="Home" to="/" icon="home" />
            <BottomNavigationAction label="About" to="/about" icon="info" />
            <BottomNavigationAction
                label="Contact"
                to="/contact"
                icon="external"
            />
        </BottomNavigation>
    );
}

function Content() {
    const { page } = use(NavContext);
    return <div style={{ padding: "16px" }}>Current Page: {page}</div>;
}
