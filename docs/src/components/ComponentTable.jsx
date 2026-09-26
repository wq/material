import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableTitle,
    TableHead,
    TableRow,
    Link,
} from "@wq/material";
import { usePages } from "@wq/gatsby-components";

export default function ComponentTable({ folderTitle }) {
    const folder = usePages()
        .find((s) => s.name === "Component API")
        ?.pages.find((s) => s.title === folderTitle);
    const pages = folder
        ? folder.pages.filter((page) => page.url !== folder.url)
        : [];
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableTitle>Component</TableTitle>
                    <TableTitle>@wq/material-web</TableTitle>
                    <TableTitle>@wq/material-native</TableTitle>
                </TableRow>
            </TableHead>
            <TableBody>
                {pages.map((page) => (
                    <TableRow key={page.title}>
                        <TableCell>
                            <Link to={page.url}>{page.title}</Link>
                        </TableCell>
                        <TableCell>
                            <Link href={getUrl(page.url, "web")}>Web</Link>
                        </TableCell>
                        <TableCell>
                            <Link href={getUrl(page.url, "native")}>
                                Native
                            </Link>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

function getUrl(url, module) {
    const parts = url.split("/"),
        name = parts[parts.length - 1];
    return `https://github.com/wq/material/blob/main/packages/material-${module}/src/components/${name}.js`;
}
