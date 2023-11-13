import React from "react";
import { useState, useEffect, useMemo } from "react";
import { users } from "../../Data/users_mock";
import "./UserManagement.css";
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

const COLUMNS = [
  {
    Header: "user_id",
    accessor: "user_id",
  },
  {
    Header: "first_name",
    accessor: "first_name",
  },
  {
    Header: "last_name",
    accessor: "last_name",
  },
  {
    Header: "username",
    accessor: "username",
  },
  {
    Header: "user_confirmed",
    accessor: "user_confirmed",
  },
  {
    Header: "registered_at",
    accessor: "registered_at",
  },
];

export default function UserManagement() {
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
          prepareRow(row);
          const isRowExpanded = row.original.user_id === expandedRow;
          return (
            <>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() =>
                  setExpandedRow(isRowExpanded ? null : row.original.user_id)
                }
                className={classes.smallIconButton}
              >
                {isRowExpanded ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </IconButton>
            </>
          );
        },
      },
      ...columns,
    ];
  }, [columns, classes.smallIconButton]);
  const [data, setData] = useState(() => [...users]);
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
            const isRowExpanded = row.original.user_id === expandedRow;
            return (
              <>
                <tr
                  {...row.getRowProps()}
                  onClick={() =>
                    setExpandedRow(isRowExpanded ? null : row.original.user_id)
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
                          <th>phone_nr</th>
                          <th>gender</th>
                          <th>birthday</th>
                          <th>street</th>
                          <th>city</th>
                          <th>postal_code</th>
                          <th>country</th>
                        </tr>
                        <tr>
                          <td>{row.original.phone_nr}</td>
                          <td>{row.original.gender}</td>
                          <td>{row.original.birthday}</td>
                          <td>{row.original.street}</td>
                          <td>{row.original.city}</td>
                          <td>{row.original.postal_code}</td>
                          <td>{row.original.country}</td>
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
      <div></div>
    </div>
  );
}
