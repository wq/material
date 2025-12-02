import { useMemo } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { useLocation } from "@reach/router";

const allPageQuery = graphql`
    query {
        allFile {
            nodes {
                childMdx {
                    frontmatter {
                        title
                        section
                        icon
                        order
                    }
                    tableOfContents
                }
                relativeDirectory
                name
            }
        }
    }
`;

function getUrl(node) {
    const prefix = node.relativeDirectory ? `/${node.relativeDirectory}` : "",
        name = node.name === "index" ? "/" : `/${node.name}`;
    return `${prefix}${name}`;
}

export function usePages() {
    const nodes = useStaticQuery(allPageQuery).allFile.nodes;
    return useMemo(() => {
        const sections = [];
        const pages = nodes
            .map(({ childMdx: mdx, ...node }) => ({
                title:
                    mdx.frontmatter.title ||
                    mdx.tableOfContents?.items?.[0]?.title ||
                    node.name,
                icon: mdx.frontmatter.icon,
                url: getUrl(node),
                order: mdx.frontmatter.order || 0,
                section: mdx.frontmatter.section || "",
                folder: node.relativeDirectory,
            }))
            .filter((page) => page.url !== "/404")
            .sort((a, b) => {
                if (a.folder === b.folder) {
                    if (a.url === `/${a.folder}/`) {
                        return -1;
                    } else if (b.url === `/${b.folder}/`) {
                        return 1;
                    }
                }
                if (a.order !== b.order) {
                    return a.order - b.order;
                }
                return a.title.localeCompare(b.title);
            });

        for (const page of pages) {
            let section = sections.find((s) => s.name === page.section);
            if (!section) {
                section = { name: page.section, pages: [] };
                sections.push(section);
            }
            if (page.folder) {
                let folder = section.pages.find(
                    (s) => s.url === `/${page.folder}/`,
                );
                if (!folder) {
                    folder = {
                        title: page.title,
                        icon: page.icon,
                        url: page.url,
                        pages: [],
                    };
                    section.pages.push(folder);
                }
                folder.pages.push(page);
            } else {
                section.pages.push(page);
            }
        }
        return sections;
    }, [nodes]);
}

export function useNav() {
    // FIXME
    return () => null;
}

export function useReverse() {
    // FIXME
    return () => null;
}

export function useRouteInfo() {
    // FIXME
    return () => null;
}

export function useBreadcrumbs() {
    const breadcrumbs = [],
        sections = usePages(),
        location = useLocation();
    for (const section of sections) {
        for (const folder of section.pages) {
            if (location.pathname.startsWith(folder.url)) {
                breadcrumbs.push({ url: folder.url, label: folder.title });
            }
            for (const page of folder.pages || []) {
                if (
                    page.url !== folder.url &&
                    (location.pathname === page.url ||
                        location.pathname === `${page.url}/`)
                ) {
                    breadcrumbs.push({ url: page.url, label: page.title });
                }
            }
        }
    }
    return breadcrumbs;
}

export function usePageTitle() {
    const location = useLocation(),
        sections = usePages();
    for (const section of sections) {
        for (const folder of section.pages) {
            if (folder.pages) {
                for (const page of folder.pages) {
                    if (
                        location.pathname === page.url ||
                        location.pathname === `${page.url}/`
                    ) {
                        return page.title;
                    }
                }
            } else if (folder.url === location.pathname) {
                return folder.title;
            }
        }
    }
    return location.pathname.replace(/^\/+|\/+$/, "");
}
