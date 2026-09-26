import React, { useState } from "react";
import {
    Root,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TablePagination,
    TableTitle,
} from "@wq/material";

export default function TableSnippet() {
    const [page, setPage] = useState(0),
        [rowsPerPage, setRowsPerPage] = useState(5);
    return (
        <Root>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableTitle>Header 1</TableTitle>
                            <TableTitle>Header 2</TableTitle>
                            <TableTitle>Header 3</TableTitle>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Data 1</TableCell>
                            <TableCell>Data 2</TableCell>
                            <TableCell>Data 3</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Data 4</TableCell>
                            <TableCell>Data 5</TableCell>
                            <TableCell>Data 6</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <TablePagination
                    count={10}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onPageChange={(event, newPage) => setPage(newPage)}
                    onRowsPerPageChange={(event) =>
                        setRowsPerPage(parseInt(event.target.value, 10))
                    }
                />
            </TableContainer>
        </Root>
    );
}
