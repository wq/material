import React from "react";
import { TablePagination, Paper } from "@mui/material";
import { useComponents, withWQ } from "@wq/react";
import { useReverse, useNav, useRouteInfo } from "./Link.js";

const PaginationFallback = {
    components: {
        useReverse,
        useNav,
        useRouteInfo,
    },
};

function Pagination({ multiple, page: pageNum, count, per_page }) {
    const { useReverse, useNav, useRouteInfo } = useComponents(),
        reverse = useReverse(),
        nav = useNav(),
        { name: routeName, params } = useRouteInfo();

    if (!(multiple && count && per_page)) {
        return null;
    }

    const updateParams = (newParams) => {
        nav(
            reverse(
                routeName,
                {},
                {
                    ...params,
                    ...newParams,
                }
            )
        );
    };
    const handleChangePage = (evt, page) => updateParams({ page: page + 1 });
    const handleChangeRowsPerPage = (evt) =>
        updateParams({ limit: evt.target.value });
    return (
        <Paper>
            <TablePagination
                component="div"
                count={count}
                page={pageNum - 1}
                rowsPerPage={per_page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default withWQ(Pagination, {
    fallback: PaginationFallback,
});
