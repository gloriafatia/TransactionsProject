import React from "react";
import { useState, useEffect, useMemo } from "react";
import { transactions } from "../../Data/trx_mock";
import "./Transactions.css";
import { COLUMNS } from "./columns";
import { useTable, usePagination, Row, Column } from "react-table";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  smallIconButton: {
    padding: "1px",
    marginLeft: "1px",
    marginRight: "1px",
  },
});

export default function Transactions() {
  const classes = useStyles();

  type TableColumn = Column<{
    [key: string]: any;
  }>;
  const columns = useMemo(() => COLUMNS, []);

  const initialColumns: TableColumn[] = useMemo(() => {
    return [
      {
        Header: " ",
        accessor: "expand",
        Cell: ({ row }: any) => {
          const isRowExpanded = row.original.trx_id === expandedRow;
          return (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() =>
                setExpandedRow(isRowExpanded ? null : row.original.trx_id)
              }
              className={classes.smallIconButton}
            >
              {isRowExpanded ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </IconButton>
          );
        },
      },
      ...columns,
    ];
  }, [columns, classes.smallIconButton]);

  const data = useMemo(() => transactions, []);

  const [expandedRow, setExpandedRow] = useState(null);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    // @ts-ignore
    page,
    // @ts-ignore
    nextPage,
    // @ts-ignore
    previousPage,
    // @ts-ignore
    canNextPage,
    // @ts-ignore
    canPreviousPage,
    // @ts-ignore
    pageOptions,
    // @ts-ignore
    state,
    prepareRow,
  } = useTable(
    {
      columns: initialColumns,
      data,
    },
    usePagination
  );

  // @ts-ignore
  const { pageIndex } = state;

  return (
    <div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row: any) => {
            prepareRow(row);
            const isRowExpanded = row.original.trx_id === expandedRow;
            return (
              <>
                <tr
                  {...row.getRowProps()}
                  onClick={() =>
                    setExpandedRow(isRowExpanded ? null : row.original.trx_id)
                  }
                >
                  {row.cells.map((cell: any) => {
                    return (
                      <td {...cell.getCellProps()}> {cell.render("Cell")}</td>
                    );
                  })}
                </tr>
                {isRowExpanded && (
                  <tr>
                    <td colSpan={initialColumns.length}>
                      <table>
                        <tr>
                          <th>iban</th>
                          <th>swift</th>
                          <th>operator</th>
                          <th>part</th>
                        </tr>
                        <tr>
                          <td>{row.original.iban}</td>
                          <td>{row.original.swift}</td>
                          <td>{row.original.operator}</td>
                          <td>{row.original.part}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                )}
              </>
            );
          })}
        </tbody>
      </table>
      <div className="center">
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
      </div>
    </div>
  );
}
