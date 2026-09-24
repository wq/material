import { useMemo } from "react";
import { withWQ } from "@wq/react";
import {
    Accordion,
    Alert,
    Badge,
    BottomNavigation,
    BottomNavigationAction,
    Breadcrumbs,
    Button,
    ButtonLink,
    CheckboxButton,
    Chip,
    CircularProgress,
    Container,
    Divider,
    ExpandableListItem,
    Fab,
    Footer,
    FooterContent,
    FormatJson,
    Grid,
    Header,
    HomeLink,
    HorizontalView,
    IconButton,
    Img,
    LinearProgress,
    Link,
    List,
    ListItem,
    ListItemLink,
    ListSubheader,
    Main,
    Menu,
    MenuItem,
    NavMenuFixed,
    NavMenuPopup,
    Pagination,
    Popup,
    RadioButton,
    ScrollView,
    SidePanel,
    Skeleton,
    Switch,
    TabGroup,
    TabItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableTitle,
    Text,
    Typography,
    View,
} from "./components/index.js";
import { useMinWidth } from "./hooks.js";
import {
    Add,
    BreadcrumbSeparator,
    Cancel,
    Close,
    Collapse,
    Config,
    Delete,
    Detail,
    Edit,
    Error,
    Expand,
    External,
    GpsStart,
    GpsStop,
    Home,
    ListIcon,
    Login,
    Logout,
    Map,
    MenuIcon,
    PanelClose,
    PanelOpen,
    Pending,
    Search,
    Success,
} from "./icons.js";
import {
    createTheme as createMuiTheme,
    ThemeProvider,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const defaultTheme = {
    primary: "#7500ae",
    secondary: "#0088bd",
};

function Root({ children, theme }) {
    if (theme) {
        return <ThemeRoot theme={theme}>{children}</ThemeRoot>;
    } else {
        return children || null;
    }
}

function ThemeRoot({ children, theme }) {
    const muiTheme = useMemo(() => createTheme(theme), [theme]);
    return (
        <ThemeProvider theme={muiTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}

export default withWQ(Root, {
    defaults: {
        components: {
            Accordion,
            Alert,
            Badge,
            BottomNavigation,
            BottomNavigationAction,
            Breadcrumbs,
            Button,
            ButtonLink,
            CheckboxButton,
            Chip,
            CircularProgress,
            Collapse,
            Container,
            Divider,
            Error,
            Expand,
            ExpandableListItem,
            Fab,
            Footer,
            FooterContent,
            FormatJson,
            Grid,
            Header,
            HomeLink,
            HorizontalView,
            IconButton,
            Img,
            LinearProgress,
            Link,
            List,
            ListIcon,
            ListItem,
            ListItemLink,
            ListSubheader,
            Main,
            Menu,
            MenuItem,
            NavMenuFixed,
            NavMenuPopup,
            Pagination,
            Popup,
            RadioButton,
            ScrollView,
            SidePanel,
            Skeleton,
            Switch,
            TabGroup,
            TabItem,
            Table,
            TableBody,
            TableCell,
            TableContainer,
            TableHead,
            TablePagination,
            TableRow,
            TableTitle,
            Text,
            Typography,
            View,
            useMinWidth,
        },
        icons: {
            Add,
            BreadcrumbSeparator,
            Cancel,
            Close,
            Collapse,
            Config,
            Delete,
            Detail,
            Edit,
            Error,
            Expand,
            External,
            GpsStart,
            GpsStop,
            Home,
            List: ListIcon,
            Login,
            Logout,
            Map,
            Menu: MenuIcon,
            PanelClose,
            PanelOpen,
            Pending,
            Search,
            Success,
        },
    },
});

function createTheme(theme) {
    if (theme === true) {
        theme = defaultTheme;
    }
    const { type, primary, secondary, background } = theme;
    const palette = theme.palette || {};
    if (type) {
        palette.mode = type;
    }
    if (primary) {
        palette.primary = { main: primary };
    }
    if (secondary) {
        palette.secondary = { main: secondary };
    }
    if (background) {
        palette.background = { paper: background };
    }
    return createMuiTheme({ palette });
}
