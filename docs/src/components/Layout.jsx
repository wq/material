import {
    Root,
    Container,
    Header,
    Main,
    Footer,
    NavMenuFixed,
} from "@wq/material";
import {
    NavMenu,
    Content,
    usePageTitle,
    useNav,
    useReverse,
    useRouteInfo,
    useBreadcrumbs,
} from "@wq/gatsby-components";
import { Link } from "gatsby";

import Info from "@mui/icons-material/Info";
import NpmPackage from "@mui/icons-material/Javascript";
import Code from "@mui/icons-material/Code";

import Index from "@mui/icons-material/List";
import Display from "@mui/icons-material/Label";
import LayoutIcon from "@mui/icons-material/ViewComfy";
import ContentIcon from "@mui/icons-material/Article";
import Button from "@mui/icons-material/CheckCircle";
import List from "@mui/icons-material/ListAlt";
import Table from "@mui/icons-material/GridOn";
import Modal from "@mui/icons-material/MenuOpen";

import "./styles.css";

const config = {
    site_title: "@wq/material",
    logo: "/images/icons/wq.svg",
};

const components = {
    NavLink: Link,
    NavMenu,
    useNav,
    useReverse,
    useRouteInfo,
    useBreadcrumbs,
};

const icons = {
    Info,
    NpmPackage,
    Code,
    Index,
    Display,
    Layout: LayoutIcon,
    Content: ContentIcon,
    Button,
    List,
    Table,
    Modal,
};

const overrides = { config, components, icons };

const theme = {
    primary: "#7500ae",
    secondary: "#0088bd",
};

export default function Layout({ children }) {
    return (
        <Root wq={overrides} theme={theme}>
            <Container>
                <Header />
                <Main>
                    <NavMenuFixed />
                    <Content>{children}</Content>
                </Main>
                <Footer />
            </Container>
        </Root>
    );
}

export function Head() {
    const pageTitle = usePageTitle();
    return (
        <>
            <title>
                {pageTitle} - {overrides.config.site_title}
            </title>
        </>
    );
}
